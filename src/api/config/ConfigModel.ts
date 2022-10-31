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
  item: string,
  value: string,
  validate: string,
  sort: number,
}

export const defaultForm: ConfigItem = {
  id: null,
  name: '',
  label: '',
  group: '',
  type: '',
  component: 'input',
  component_props: '',
  item: '',
  value: '',
  validate: '',
  sort: 0,
};