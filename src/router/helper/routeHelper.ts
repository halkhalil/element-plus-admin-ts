import {AppRouteRecordRaw} from "~/router/types";
import {filter} from "~/utils/helper/treeHelper";
import {LAYOUT, CONTENT, IFRAME, EXCEPTION_COMPONENT, getParentLayout} from "~/router/constant";
import {warn} from "~/utils/log";
import {fetchMenus} from "~/api/account";
import {asyncRoutes} from "~/router/routes";
import {RoleEnum} from "~/enums/permission";
import {useStore} from "~/store";


let dynamicViewsModules: Record<string, () => Promise<Record<any, any>>>;

const LayoutMap = new Map();
LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('CONTENT', CONTENT);
LayoutMap.set('IFRAME', IFRAME);


/**
 * 动态引入组件
 * @param dynamicViewsModules
 * @param component
 */
const dynamicImport = (dynamicViewsModules: Record<string, () => Promise<Record<any, any>>>, component: string,) => {
  const keys = Object.keys(dynamicViewsModules);
  const componentPath = component.replace('/views', 'views')
  const matchKey = keys.find(key => key.replace('../../', '') === componentPath);
  if (matchKey) return dynamicViewsModules[matchKey];

  warn('在src/views/下找不到`' + component + '请自行创建!');
  return EXCEPTION_COMPONENT;
}


/**
 * 前端菜单模式
 * 根据用户角色过滤路由
 */
export const buildRouteByRole = async () => {
  const {userStore} = useStore();
  let routes: AppRouteRecordRaw[] = asyncRoutes;
  const roleList = userStore.getRoles;

  const routePermissionFilter = (route: AppRouteRecordRaw) => {
    const {meta} = route;
    const {roles} = meta || {};
    if (!roles) return true;
    return roleList.some(role => roles.includes(role as RoleEnum));
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
  console.log(routes)
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
    const {component, children, name} = item;
    if (component) {
      const layout = LayoutMap.get(component.toUpperCase());
      item.component = layout ? layout : dynamicImport(dynamicViewsModules, component as string);
    } else if (name) {
      // @TODO 参考vben 没理解这行代码的意义
      item.component = getParentLayout('ParentLayout');
    }
    children && asyncImportRoute(children);
  });
}
