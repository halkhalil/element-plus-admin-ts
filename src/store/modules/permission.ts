import {fetchPermissions} from "~/api/account";
import {buildRouteByBackMenu, buildRouteByRole} from "~/router/helper/routeHelper";
import {transformRouteToMenu} from "~/router/helper/menuHelper";
import {AppRouteRecordRaw, Menu} from "~/router/types";
import {PermissionModeEnum} from "~/enums/permission";
import {defineStore} from "pinia";
import {useAppStore} from "~/store/modules/app";

interface PermissionState {
  menus: Menu[],
  permissions: string[] | number[],
  isLoaded: boolean, // 是否已加载，该字段禁止缓存
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    menus: [],
    permissions: [],
    isLoaded: false,
  }),
  getters: {
    getMenus: (state) => state.menus,
    getPermissions: (state) => state.permissions,
    getIsLoaded: (state) => state.isLoaded,
  },
  actions: {
    // 获取权限节点
    async fetchPermissions() {
      const {data: {data: permissions}} = await fetchPermissions();
      this.permissions = permissions;
      return Promise.resolve(permissions);
    },
    // 生成路由
    async buildRoutes() {
      const appStore = useAppStore();
      const {permissionMode} = appStore.getProjectConfig;
      let routes: AppRouteRecordRaw[] = [];

      switch (permissionMode) {
        case PermissionModeEnum.FRONT_MENU: // 前端菜单模式，更绝用户角色过滤路由
          routes = await buildRouteByRole();
          break;
        case PermissionModeEnum.BACK_MENU:// 后端菜单模式，根据后端返回的菜单生成路由
          await this.fetchPermissions();
          routes = await buildRouteByBackMenu();
          break;
      }

      const menus = transformRouteToMenu(routes) as unknown as Menu[];
      menus.sort((a, b) => (a?.sort || 0) - (b?.sort || 0));
      this.menus = menus;
      this.isLoaded = true;
      return Promise.resolve(routes);
    }
  },
});