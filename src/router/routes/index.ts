import basicRoute from "~/router/routes/basic";
import componentRoute from "~/router/routes/modules/demo/component";
import dashboardRoute from "~/router/routes/modules/dashboard";
import featureRoute from "~/router/routes/modules/demo/feature";
import pageRoute from "~/router/routes/modules/demo/page";
import permissionRoute from "~/router/routes/modules/demo/permission";
import {AppRouteModule, AppRouteRecordRaw} from "~/router/types";

// demo中生成菜单
const demoRoutes: AppRouteRecordRaw[] = [
  ...dashboardRoute,
  ...componentRoute,
  ...pageRoute,
  ...featureRoute,
  ...permissionRoute,
];


// module
const moduleRoutes: AppRouteModule[] = [];
const moduleFiles = import.meta.globEager('./modules/*.ts');
Object.keys(moduleFiles).forEach((key) => moduleRoutes.push(...moduleFiles[key].default));


// 异步路由
export const asyncRoutes: AppRouteRecordRaw[] = [...demoRoutes, ...moduleRoutes];

// 需要生成菜单的路由
export const menuRoutes: AppRouteRecordRaw[] = [...demoRoutes];

// 基础路由
export const basicRoutes: AppRouteRecordRaw[] = [...basicRoute];