import {MenuRuleEnum, MenuTypeEnum} from "~/enums/menu";

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
  link?: string,
  rule?: string,
  status?: number,
  keepalive?: number,
  affix?: number,
}

export const defaultForm: MenuItem = {
  id: null,
  pid: null,
  type: MenuTypeEnum.DIR,
  name: '',
  label: '',
  path: '',
  icon: '',
  component: '',
  link: '',
  rule: MenuRuleEnum.TAB,
  status: 1,
  keepalive: 1,
  affix: 0,
};