import {useAxios} from "~/api/useAxios";
import {reactive, Ref, toRefs, unref} from "vue";
import {useFetchResources as usfFetchResource2} from "~/composables/useFetchResources";

export interface ItemType {
  id?: string | number | null,
  username?: string,
  nickname?: string,
  password?: string,
  status?: boolean,
  role_ids?: string[] | number[],
}

export type EasyItemType = { id?: string | number }

interface UseAxiosOptions {
  immediate?: boolean;
}


export enum Api {
  list = '/users',
}

/**
 * 获取列表
 * @param params
 * @param options
 */
export const useFetchList = (params?: object, options?: UseAxiosOptions) => {
  return useAxios(Api.list, {method: 'get', params}, options);
}

/**
 * 获取详情
 * @param item
 * @param options
 */
export const useFetchItem = (item: EasyItemType, options?: UseAxiosOptions) => {
  return useAxios([Api.list, unref(item).id].join('/'), {method: 'get'}, options);
}

/**
 * 新增数据
 * @param item
 * @param options
 */
export const useFetchStore = (item: ItemType, options?: UseAxiosOptions) => {
  return useAxios(Api.list, {method: 'post', data: item}, options);
}

/**
 * 更新数据
 * @param item
 * @param options
 */
export const useFetchUpdate = (item: ItemType, options?: UseAxiosOptions) => {
  return useAxios([Api.list, unref(item).id].join('/'), {method: 'put', data: item}, options);
}

/**
 * 删除数据
 * @param item
 * @param options
 */
export const useFetchDelete = (item: EasyItemType, options?: UseAxiosOptions) => {
  return useAxios([Api.list, unref(item).id].join('/'), {method: 'delete'}, options);
}

interface FetchResourceOption {
  query?: object,
  itemData?: object,
  immediate?: boolean
}

/**
 * 资源操作 实现增删改查
 * @param options
 */
export const useFetchResource = (options ?: FetchResourceOption) => {

  let {query = {page: 1}, item = {}, immediate = false} = {...options};

  query = reactive(query);
  item = reactive(item) as ItemType;

  const useResource = usfFetchResource2(
    useFetchList(query, {immediate}),
    useFetchItem(item, {immediate: false}),
    useFetchUpdate(item, {immediate: false}),
    useFetchStore(item, {immediate: false}),
    useFetchDelete(item, {immediate: false}),
    item
  )

  return {
    query,
    item,
    ...useResource
  }
}