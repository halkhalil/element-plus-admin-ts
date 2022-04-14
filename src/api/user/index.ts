import {useAxios, UseAxiosOptions} from "~/api/useAxios";
import {useFetchResources as useFetchResource2, UseFetchResourcesReturn} from "~/composables/useFetchResources";
import {UserItem, BaseItem} from "~/api/user/UserModel";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {ref, Ref, toRaw, unref} from "vue";


export enum Api {
  list = '/users',
}

/**
 * 新增数据
 * @param item
 * @param options
 */
export const useFetchStore = (item: UnwrapNestedRefs<UserItem>, options?: UseAxiosOptions) => {
  return useAxios(Api.list, {method: 'post', data: item}, options);
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
export const useFetchItem = (item: Ref<BaseItem>, options?: UseAxiosOptions) => {
  console.log('useFetchItem', toRaw(item))
  return useAxios(ref(Api.list), {method: 'get'}, options);
}

/**
 * 更新数据
 * @param item
 * @param options
 */
export const useFetchUpdate = (item: UnwrapNestedRefs<UserItem>, options?: UseAxiosOptions) => {
  return useAxios([Api.list, item.id].join('/'), {method: 'put', data: item}, options);
}

/**
 * 删除数据
 * @param item
 * @param options
 */
export const useFetchDelete = (item: UnwrapNestedRefs<BaseItem>, options?: UseAxiosOptions) => {
  return useAxios([Api.list, item.id].join('/'), {method: 'delete'}, options);
}

/**
 * 资源操作 实现增删改查
 * @param defaultItem
 * @param options
 */
export const useFetchResource = (defaultItem?: object, options?: object): UseFetchResourcesReturn => {

  return useFetchResource2(useFetchList, useFetchItem, useFetchUpdate, useFetchStore, useFetchDelete, defaultItem);
}