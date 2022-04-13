import {useAxios, UseAxiosOptions} from "~/api/useAxios";
import {reactive, unref} from "vue";
import {useFetchResources as usfFetchResource2} from "~/composables/useFetchResources";
import {FetchUserResourceOptions, UseFetchUserResourcesReturn, UserItem, UserQuery} from "~/api/user/UserModel";


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
export const useFetchItem = (item: UserItem, options?: UseAxiosOptions) => {
  return useAxios([Api.list, unref(item).id].join('/'), {method: 'get'}, options);
}

/**
 * 新增数据
 * @param item
 * @param options
 */
export const useFetchStore = (item: UserItem, options?: UseAxiosOptions) => {
  return useAxios(Api.list, {method: 'post', data: item}, options);
}

/**
 * 更新数据
 * @param item
 * @param options
 */
export const useFetchUpdate = (item: UserItem, options?: UseAxiosOptions) => {
  return useAxios([Api.list, unref(item).id].join('/'), {method: 'put', data: item}, options);
}

/**
 * 删除数据
 * @param item
 * @param options
 */
export const useFetchDelete = (item: UserItem, options?: UseAxiosOptions) => {
  return useAxios([Api.list, unref(item).id].join('/'), {method: 'delete'}, options);
}


/**
 * 资源操作 实现增删改查
 * @param options
 */
export const useFetchResource = (options ?: FetchUserResourceOptions): UseFetchUserResourcesReturn => {

  let {query = {}, item = {}, immediate = true} = {...options};

  query = reactive(query) as UserQuery;
  item = reactive(item) as UserItem;
  const useFetchListReturn = useFetchList(query, {immediate})

  const useResource = usfFetchResource2(
    useFetchListReturn,
    useFetchItem(item, {immediate: false}),
    useFetchUpdate(item, {immediate: false}),
    useFetchStore(item, {immediate: false}),
    useFetchDelete(item, {immediate: false}),
    item
  )

  const changePage = (page) => {
    query.page = page;
    useFetchListReturn.execute();
  }

  return {
    query,
    item,
    changePage,
    ...useResource
  }
}