import {UseFetchResourcesReturn} from "~/composables/useFetchResources";

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

export interface UserQuery extends Partial<UserItem> {
  page?: number,
}

export interface UserResponseModel {
  data: UserItem[],
  meta: object
}

export type EasyItemType = { id?: string | number }

export interface FetchUserResourceOptions {
  query?: object,
  item?: UserItem,
  immediate?: boolean
}

