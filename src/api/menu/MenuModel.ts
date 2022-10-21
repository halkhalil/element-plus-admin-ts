import {MenuTypeEnum} from "~/enums/app";

export interface BaseItem {
  id?: string | number | null
}

export interface MenuItem extends BaseItem {
  type?: MenuTypeEnum | string,
  pid?: number|null,
  name: string,
  label: string,
  remark?: string,
  path?: string,
  icon?: string,
}