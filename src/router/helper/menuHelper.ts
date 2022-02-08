import {AppRouteModule, AppRouteRecordRaw, Menu, RouteMeta} from "~/router/types";
import {cloneDeep,pick} from 'lodash-es';
import {isUrl} from '~/utils/is';
import {findPath, treeMap} from '~/utils/helper/treeHelper';

// 菜单添加父级路径
function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path);
    }
  }
}

export function transformRouteToMenu(routeModList: AppRouteModule[]) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];

  cloneRouteModList.forEach((item) => {
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });

  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const {title,...meta} = node.meta;
      return {path: node.path,title, ...meta};
    },
  });

  joinParentPath(list);
  return cloneDeep(list);
}