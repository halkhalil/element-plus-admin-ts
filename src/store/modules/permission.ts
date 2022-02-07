import {asyncRoutes, menuRoutes} from '~/router/routes';
import {permissions} from "~/api/personal";
import {listToTree} from "~/utils/helper/treeHelper";
import {AppRouteRecordRaw} from "~/router/types";
import {PermissionModeEnum} from "~/enums/permission";
import {filter} from "~/utils/helper/treeHelper";
import {buildRouter, routeFilter} from "~/router/helper/routeHelper";

/**
 * 判断是否有路由权限
 * @param route
 * @param permission
 * @returns {boolean}
 */
function hasPermission(route, permission) {
  return true;
}

/**
 * 通过权限节点过滤路由
 * @param routes
 * @param permission
 * @returns {[]}
 */
function filterAsyncRoutes(routes, permission) {
  const res = [];
  const defaultRouteMeta = {meta: {menu: true, cache: true, affix: false}};
  routes.forEach(route => {
    let _route = {...defaultRouteMeta, ...route};
    if (hasPermission(_route, permission)) {
      if (_route.children) {
        _route.children = filterAsyncRoutes(_route.children, permission);
      }
      res.push(_route);
    }
  });
  return res
}

/**
 * 过滤菜单
 * @param routes
 * @param parentPath
 * @returns {[]}
 */
function filterMenus(routes, parentPath = '') {
  const res = [];
  routes.forEach(({path, meta: {icon, title, menu}, children}) => {
    let fullPath = parentPath + '/' + path.replace('/', '');
    let tmp = {path: fullPath, icon: icon, title: title, children: []};
    if (menu) {
      if (children) {
        tmp.children = filterMenus(children, fullPath);
      }
      res.push(tmp);
    }
  });
  return res;
}

const permission = {
  namespaced: true,
  state: {
    backMenus:[],
    frontMenus:[],
    menus:[],
    roles: [],// 角色
    actions: [],// 动作
    isLoaded: false, // 是否已加载，该字段禁止缓存
  },
  mutations: {
    SET_PERMISSIONS(state, {roles, menus, actions}) {
      state.menus = menus;
      state.roles = roles;
      state.actions = actions;
      state.isLoaded = true;
    },
  },
  actions: {
    getPermissions: async ({commit, dispatch}) => {

      const {data: {data: permission}} = await permissions();
      const {roles = [], menus = [], actions = []} = permission;
      const _menus = menus.map(({id, pid, label, url, icon, type}) => ({id, pid, title: label, path: url, icon, type}))
      const backendMenu = listToTree(_menus);// 后端菜单
      const frontedMenu = filterMenus(menuRoutes);// 前端菜单
      commit('SET_PERMISSIONS', {roles, menus: [...frontedMenu, ...backendMenu], actions});
      const routes = buildRouter(asyncRoutes);
      return Promise.resolve(routes);
    },
  }
};
export default permission;
