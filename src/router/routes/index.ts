import basicRoute from "~/router/routes/basic";
import {AppRouteModule, AppRouteRecordRaw} from "~/router/types";

// module
const moduleRoutes: AppRouteModule[] = [];
const moduleFiles = import.meta.globEager('./modules/**/*.ts');
Object.keys(moduleFiles).forEach((key) => moduleRoutes.push(...moduleFiles[key].default));

// 异步路由
export const asyncRoutes: AppRouteRecordRaw[] = moduleRoutes;

// 基础路由
export const basicRoutes: AppRouteRecordRaw[] = basicRoute;