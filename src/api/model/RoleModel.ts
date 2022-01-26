import {BaseModel} from "./BaseModel";

export interface RoleModel extends BaseModel {
  name: string,
  title: string,
  remark?: string,
  status: number | string | boolean,
  permission_ids?: string[] | number[],
}