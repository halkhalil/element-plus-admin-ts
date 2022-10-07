import axios from "~/utils/axios";
import {useApiResources} from "~/composables/useApiResources";
import {BaseItem, UserItem} from "~/api/user/UserModel";
import {useAxios, UseAxiosOptions} from "~/api/useAxios";
import {AxiosRequestConfig} from "axios";
import {reactive} from "vue";


export enum Api {
  list = '/users',
  item = '/users/:id'
}

/**
 * 列表
 * @param params
 * @param options
 */
export const useFetchLists = (params, options?: UseAxiosOptions) => {
  return useAxios(Api.list, {method: 'get', params}, options || {})
}

/**
 * 详情
 * @param id
 * @param options
 */
export const useFetchItem = (id, options?: UseAxiosOptions) => {
  return useAxios([Api.list, id].join('/'), {method: 'get'}, options || {})
}

/**
 * 新增
 * @param data
 */
export const useFetchStore = (data: UserItem) => {
  return useAxios(Api.list, {method: 'post', data}, {immediate: false})
}


export const useFetchUpdate = (id, data: UserItem) => {
  return useAxios([Api.list, id].join('/'), {method: 'put', data}, {immediate: false})
}

/**
 * 删除
 * @param id
 */
export const useFetchDelete = (id) => {
  return useAxios([Api.list, id].join('/'), {method: 'delete'}, {immediate: false})
}


export const useFetchResource = (options?: object) => {
  const params = reactive({});
  const item = reactive<UserItem | {}>({})
  return useApiResources({
    fetchList: useFetchItems(params, {immediate: false}),
    fetchItem: useFetchItem(item, {immediate: false}),
    fetchStore: useFetchStore(item),
    fetchUpdate: useFetchUpdate(item),
    fetchDelete: useFetchDelete(item),
  })
}