import {asyncRoutes} from '~/router/routes';
import {fetchPermissions} from "~/api/account";
import {buildRouteByBackMenu, buildRouteByRole} from "~/router/helper/routeHelper";
import {transformRouteToMenu} from "~/router/helper/menuHelper";
import store from "~/store";
import {AppRouteRecordRaw} from "~/router/types";
import {PermissionModeEnum} from "~/enums/permission";

const permission = {
  namespaced: true,
  state: {
    menus: [],
    permissions: [],
    isLoaded: false, // 是否已加载，该字段禁止缓存
  },
  mutations: {
    SET_PERMISSIONS(state, {menus, permissions}) {
      if (menus) state.menus = menus;
      if (permissions) state.menus = permissions;
      state.isLoaded = true;
    },
  },
  actions: {
    // 获取权限节点
    getPermissions: async ({commit, dispatch}) => {
      const {data: {data: permissions}} = await fetchPermissions();
      commit('SET_PERMISSIONS', {permissions});
      return Promise.resolve(permissions);
    },
    // 生成路由
    buildRoutes: async ({commit, dispatch}) => {
      const {permissionMode} = store.getters.getProjectConfig;
      let routes: AppRouteRecordRaw[] = [];

      switch (permissionMode) {
        case PermissionModeEnum.FRONT_MENU: // 前端菜单模式，更绝用户角色过滤路由
          routes = await buildRouteByRole();
          break;
        case PermissionModeEnum.BACK_MENU:// 后端菜单模式，根据后端返回的菜单生成路由
          const permissions = await dispatch('getPermissions');
          routes = await buildRouteByBackMenu();
          break;
      }

      const menus = transformRouteToMenu(routes);
      menus.sort((a, b) => (a?.sort || 0) - (b?.sort || 0));
      commit('SET_PERMISSIONS', {menus});
      console.log(menus);
      return Promise.resolve(routes);
    }
  }
};
export default permission;
