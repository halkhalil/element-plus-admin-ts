import {useAxios, UseAxiosOptions} from "~/api/useAxios";
import {Ref} from "vue";

interface userData {
    id?: string | number | null,
    username: string,
    nickname: string,
    password?: string,
    status: boolean,
    role_ids: string[] | number[],
}


enum Api {
    list = '/users',
}

/**
 * 新增数据
 * @param data
 * @param options
 */
export const useFetchStore = (data?: object, options?: UseAxiosOptions) => {
    return useAxios(Api.list, {method: 'post', data}, options);
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
 * @param id
 * @param options
 */
export const useFetchItem = (id: Ref<number|null>, options?: UseAxiosOptions) => {
    return useAxios([Api.list, id].join('/'), {method: 'get'}, options);
}

/**
 * 更新数据
 * @param id
 * @param data
 * @param options
 */
export const useFetchUpdate = (id: Ref<number|null>, data: object, options?: UseAxiosOptions) => {
    return useAxios([Api.list, id].join('/'), {method: 'put', data}, options);
}

/**
 * 删除数据
 * @param id
 * @param options
 */
export const useFetchDelete = (id: Ref<number|null>, options?: UseAxiosOptions) => {
    return useAxios([Api.list, id].join('/'), {method: 'delete'}, options);
}

export const useFetchResource = (
    useFetchList,
    useFetchItem,
    useFetchStore,
    useFetchUpdate,
    useFetchDelete,
) => {
}