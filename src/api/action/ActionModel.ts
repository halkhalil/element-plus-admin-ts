import {MethodEnum} from "~/enums/http";


export interface ActionItem {
  id?: null | string | number,
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