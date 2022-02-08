import {asyncRoutes} from '~/router/routes';
import {permissions} from "~/api/personal";
import {buildRouter} from "~/router/helper/routeHelper";
import {transformRouteToMenu} from "~/router/helper/menuHelper";

const permission = {
  namespaced: true,
  state: {
    backMenus: [],
    frontMenus: [],
    menus: [],
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
      const {roles = [], actions = []} = permission;
      // const _menus = menus.map(({id, pid, label, url, icon, type}) => ({id, pid, title: label, path: url, icon, type}))
      // const backendMenu = listToTree(_menus);// 后端菜单
      const routes = buildRouter(asyncRoutes);
      const menus = transformRouteToMenu(routes);
      menus.sort((a, b) => (a?.sort || 0) - (b?.sort || 0));
      commit('SET_PERMISSIONS', {roles, menus, actions});
      return Promise.resolve(routes);
    },

    buildRouteAction:()=>{

    }
  }
};
export default permission;
