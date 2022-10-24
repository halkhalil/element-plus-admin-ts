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

export const defaultForm: RoleItem = {
  id: null,
  name: '',
  label: '',
  permission_ids: [],
  status: true
};