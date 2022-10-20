export interface BaseItem {
  id?: string | number | null
}

export interface RoleItem extends BaseItem {
  name: string,
  label: string,
  remark?: string,
  status: boolean,
  permission_ids?: string[] | number[],
}