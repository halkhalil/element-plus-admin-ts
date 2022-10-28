import {MenuTypeEnum} from "~/enums/app";

export interface BaseItem {
  id?: string | number | null
}

export interface MenuItem extends BaseItem {
  type?: MenuTypeEnum | string,
  pid?: number | null,
  name: string,
  label: string,
  remark?: string,
  path?: string,
  icon?: string,
  component?: string,
  href?: string,
  status?: number,
  keepalive?: number,
  affix?: number,
}

export const defaultForm: MenuItem = {
  id: null,
  pid: null,
  type: '',
  name: '',
  label: '',
  path: '',
  icon: '',
  component: '',
  href: '',
  status: 1,
  keepalive: 1,
  affix: 0,
};