export interface BaseItem {
  id?: string | number | null
}

export interface UserItem extends BaseItem {
  username: string,
  nickname: string,
  password?: string,
  status?: boolean,
  role_ids?: string[] | number[],
}
