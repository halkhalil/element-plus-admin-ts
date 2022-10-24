export interface BaseItem {
  id?: string | number | null
}

export interface UserItem extends BaseItem {
  email: string,
  realname?: string,
  mobile: string,
  nickname: string,
  password?: string,
  status?: boolean,
  role_ids?: string[] | number[],
}

export const defaultForm: UserItem = {
  id: null,
  email: '',
  mobile: '',
  nickname: '',
  realname: '',
  password: '',
  role_ids: [],
  status: true
};