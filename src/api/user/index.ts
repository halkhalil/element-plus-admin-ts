import axios from "~/utils/axios";
import {useApiResource} from "~/composables/useApiResources";
import {BaseItem,UserItem} from "~/api/user/UserModel";


export enum Api {
  list = '/users',
}

export const fetchList = (params) => axios.get(Api.list, {params});
export const fetchItem = (item:UserItem) => axios.get([Api.list, item.id].join('/'));
export const fetchStore = (item:UserItem) => axios.post(Api.list, {data: item});
export const fetchUpdate = (item:UserItem) => axios.put([Api.list, item.id].join('/'), {data: item});
export const fetchDelete = (item:UserItem) => axios.delete([Api.list, item.id].join('/'));


export const useFetchResource = (options?: object) => {
  return useApiResource({fetchList, fetchItem, fetchStore, fetchUpdate, fetchDelete},
    options || {immediate: true})
}