import {useAxios} from "~/api/useAxios";
import {reactive, Ref, unref} from "vue";
import {useFetchResources} from "~/composables/useFetchResources";

export interface ItemType {
  id?: string | number | null,
  username: string,
  nickname: string,
  password?: string,
  status: boolean,
  role_ids: string[] | number[],
}

export type EasyItemType = { id: string | number }

interface UseAxiosOptions {
  immediate?: boolean;
}


export enum Api {
  list = '/users',
}

export const useFetchUsers = (options) => {

  let {query = {page: 1}, itemData = {}, immediate = true} = options;

  query = reactive(query);
  itemData = reactive(itemData);
  const axiosOptions = {immediate} as UseAxiosOptions;

  /**
   * 获取列表
   * @param params
   * @param options
   */
  const useList = (params?: object, options?: UseAxiosOptions) => {
    return useAxios(Api.list, {method: 'get', params}, options);
  }

  /**
   * 获取详情
   * @param item
   * @param options
   */
  const useItem = (item: EasyItemType, options?: UseAxiosOptions) => {
    return useAxios([Api.list, unref(item).id].join('/'), {method: 'get'}, options);
  }

  /**
   * 新增数据
   * @param item
   * @param options
   */
  const useStore = (item: ItemType, options?: UseAxiosOptions) => {
    return useAxios(Api.list, {method: 'post', data: item}, options);
  }

  /**
   * 更新数据
   * @param item
   * @param options
   */
  const useUpdate = (item: ItemType, options?: UseAxiosOptions) => {
    return useAxios([Api.list, unref(item).id].join('/'), {method: 'put', data: item}, options);
  }

  /**
   * 删除数据
   * @param item
   * @param options
   */
  const useDelete = (item: EasyItemType, options?: UseAxiosOptions) => {
    return useAxios([Api.list, unref(item).id].join('/'), {method: 'delete'}, options);
  }

  /**
   * 资源请求 实现增删改查
   */
  const useResource = () => {
    return useFetchResources(
      useList(query, axiosOptions),
      useItem(itemData, axiosOptions),
      useUpdate(itemData, axiosOptions),
      useStore(itemData, axiosOptions),
      useDelete(itemData, axiosOptions),
      options
    )
  }

  return {
    useStore,
    useList,
    useItem,
    useUpdate,
    useDelete,
    useResource,
    query,
    itemData,
  }
}