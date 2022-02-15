import {AppRouteRecordRaw, Permission} from "~/router/types";
import {filter} from "~/utils/helper/treeHelper";
import {LAYOUT, IFRAME, EXCEPTION_COMPONENT} from "~/router/constant";
import {warn} from "~/utils/log";
import {fetchMenus} from "~/api/account";
import {asyncRoutes} from "~/router/routes";


let dynamicViewsModules: Record<string, () => Promise<Record<any, any>>>;

const LayoutMap = new Map();
LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('IFRAME', IFRAME);


/**
 * 动态引入组件
 * @param dynamicViewsModules
 * @param component
 */
const dynamicImport = (dynamicViewsModules: Record<string, () => Promise<Record<any, any>>>, component: string,) => {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    warn('Please do not create `.vue` and `.TSXPlease do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',);
    return;
  } else {
    warn('在src/views/下找不到`' + component + '.vue` 或 `' + component + '.tsx`, 请自行创建!');
    return EXCEPTION_COMPONENT;
  }
}


/**
 * 前端菜单模式
 * 根据权限节点过滤路由
 * @param permissionList
 */
export const buildRouteByFrontMenu = async (permissionList) => {
  let routes = asyncRoutes;

  const routePermissionFilter = (route: AppRouteRecordRaw) => {
    const {meta} = route;
    const {permissions} = meta || {};
    if (!permissions) return true;
    return permissionList.some(permission => permissions.includes(permission as Permission));
  }

  routes = filter(routes, routePermissionFilter);

  return routes;
}

/**
 * 后端菜单模式
 * 将返回的菜单异步引入路由
 */
export const buildRouteByBackMenu = async () => {
  const {data: {data: routes}} = await fetchMenus();

  asyncImportRoute(routes as AppRouteRecordRaw[]);

  return routes as AppRouteRecordRaw[];
}

/**
 * 动态加载路由组件
 * @param routes
 */
const asyncImportRoute = (routes: AppRouteRecordRaw[]) => {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    }
    const {component, name} = item;
    const {children} = item;
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase());
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(dynamicViewsModules, component as string);
      }
    } else if (name) {
      // item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}