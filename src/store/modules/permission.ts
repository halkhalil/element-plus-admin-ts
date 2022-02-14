import {asyncRoutes} from '~/router/routes';
import {fetchPermissions} from "~/api/account";
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
    permissions:[],
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
      const {data: {data: permission}} = await fetchPermissions();
      const routes = await buildRouter(permission);
      const menus = transformRouteToMenu(routes);
      menus.sort((a, b) => (a?.sort || 0) - (b?.sort || 0));
      commit('SET_PERMISSIONS', { menus, permission});
      return Promise.resolve(routes);
    },

    buildRouteAction:async ({commit})=>{
      const {data: {data: permission}} = await fetchPermissions();
      commit('SET_PERMISSIONS', permission);
      return Promise.resolve(permission);
    }
  }
};
export default permission;
