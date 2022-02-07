import {AppRouteModule, AppRouteRecordRaw, Permission} from "~/router/types";
import {PermissionModeEnum} from "~/enums/permission";
import store from '~/store'
import {filter} from "~/utils/helper/treeHelper";
import {LAYOUT, IFRAME} from "~/router/constant";
import {warn} from "~/utils/log";


let dynamicViewsModules: Record<string, () => Promise<Record<any, any>>>;

const LayoutMap = new Map();
LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('IFRAME', IFRAME);

/**
 * 动态加载路由组件
 * @param routes
 */
function asyncImportRoute(routes: AppRouteRecordRaw[]) {
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
      item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}

/**
 * 动态引入组件
 * @param dynamicViewsModules
 * @param component
 */
function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Record<any, any>>>, component: string,) {
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
    warn(
      'Please do not create `.vue` and `.TSXPlease do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
    return;
  } else {
    warn('在src/views/下找不到`' + component + '.vue` 或 `' + component + '.tsx`, 请自行创建!');
    // return EXCEPTION_COMPONENT;
  }
}

export const buildRouter = (routes: AppRouteRecordRaw[]) => {

  const {getters} = store;
  const {permissionMode} = getters.getProjectConfig;

  const permissionList = permissionMode === PermissionModeEnum.ROLE ? getters.getRoles : getters.getActions;


  const routePermissionFilter = (route: AppRouteRecordRaw) => {
    const {meta} = route;
    const {permissions} = meta || {};
    if (!permissions) return true;
    return permissionList.some(permission => permissions.includes(permission as Permission));
  }

  routes = filter(routes, routePermissionFilter);

  return routes;
}
