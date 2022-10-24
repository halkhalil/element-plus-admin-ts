import {MethodEnum} from "~/enums/http";

export interface BaseItem {
  id?: string | number | null
}

export interface ActionItem extends BaseItem {
  name: string,
  label: string,
  method?: MethodEnum,
  uri?: string,
}

export const defaultForm: ActionItem = {
  id: null,
  name: '',
  label: '',
  method: MethodEnum.GET,
  uri: ''
};