import store from "~/store_bak";
import {Router, RouteRecordRaw} from "vue-router";
import {PageEnum} from "~/enums/page";

const whiteList: PageEnum[] = [PageEnum.LOGIN];

export function createPermissionGuard(router: Router) {
  const {dispatch, getters} = store;
  router.beforeEach(async (to, from, next) => {

    // 外链路由, 从新标签打开，返回上一个路由
    if (to.meta.href) {
      window.open(to.meta.href as string);
      next({ path: from.fullPath, replace: true, query: from.query });
      return;
    }

    if (whiteList.indexOf(to.path as PageEnum) !== -1) { // 白名单，直接进入
      next();
    } else if (getters.getAccessToken) { // 已登录 拉取用户信息,过滤权限路由,动态注册路由
      if (!getters.getUser) await dispatch('user/getUserInfo');
      if (!getters.getIsLoaded) {
        const accessRoutes: RouteRecordRaw[] = await dispatch('permission/buildRoutes');
        accessRoutes.forEach(item => router.addRoute(item));
        next({path: to.fullPath, replace: true, query: to.query});
      } else {
        next();
      }
    } else { // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`);
    }
    return true;
  });
}