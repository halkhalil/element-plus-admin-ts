import {MethodEnum} from "~/enums/http";

export interface BaseItem {
  id?: string | number | null
}

export interface ConfigItem extends BaseItem {
  name: string,
  label: string,
  value: string,
  group: string,
  type: string,
  component: string,
  props?: string,
  validate: string,
  sort: number,
  extra?: string,
  parse_extra?: object | null,
  parse_props?: object | null,
  parse_value?: object | null,
  group_value?: any,
}

export const defaultForm: ConfigItem = {
  id: null,
  name: '',
  label: '',
  value: '',
  group: '',
  type: '',
  component: '',
  props: '',
  extra: '',
  validate: '',
  sort: 0,
};