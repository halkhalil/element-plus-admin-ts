import {MethodEnum} from "~/enums/http";

export interface BaseItem {
  id?: string | number | null
}

export interface ConfigItem extends BaseItem {
  name: string,
  label: string,
  group: string,
  type: string,
  component: string,
  component_props: string,
  enum: string,
  parse_enum: object | null,
  value: string,
  validate: string,
  sort: number,
  parse_component_props?: object,
}

export const defaultForm: ConfigItem = {
  id: null,
  name: '',
  label: '',
  group: '',
  type: '',
  component: 'input',
  component_props: '',
  enum: '',
  parse_enum: null,
  value: '',
  validate: '',
  sort: 0,
};