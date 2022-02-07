import {RouteRecordRaw} from "vue-router";
import {defineComponent} from "vue";
import {RoleEnum, ActionEnum} from '~/enums/permission';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export type Permission = RoleEnum | ActionEnum;

export interface RouteMeta {
  title: string;
  cache?: boolean;
  icon?: string;
  permissions?: Permission[];
  affix?: boolean;
  hideMenu?: boolean;
  sort?: number;
  ignoreRoute?: boolean,
  frameSrc?: string;
}

export interface Menu {
  name: string,
  icon?: string,
  path: string,
  sort?: number,
  meta?: Partial<RouteMeta>,
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