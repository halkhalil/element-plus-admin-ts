import {RouteRecordRaw} from "vue-router";
import {defineComponent} from "vue";
import {RoleEnum, ActionEnum} from '~/enums/permission';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);


export interface RouteMeta {
  // 路由标题
  title: string;
  // 图标
  icon?: string;
  // 权限，可以访问的角色或动作节点
  roles?: RoleEnum[];
  // 固定标签
  affix?: boolean;
  // 当前路由不显示菜单
  hideMenu?: boolean;
  // 菜单排序
  sort?: number;
  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean;
  //
  ignoreRoute?: boolean,
  // 单个菜单，当需要将子集菜单第一个路由作为一级菜单时，需要配置该项
  single?: boolean;
  // 内嵌iframe的地址
  frameSrc?: string;
  // 默认激活的index
  defaultActive?: string,
}

export interface Menu {
  // 菜单名称
  title: string;
  // 图标
  icon?: string;
  // 路径
  path: string;
  // 路径参数
  pathParam?: string,
  // 排序
  sort?: number;
  // 分组名称
  group?: string,
  // 是否禁用
  disabled?: boolean,
  // 子集菜单
  children?: Menu[];
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Record<any, any>;
  fullPath?: string;
}

export type AppRouteModule = AppRouteRecordRaw;