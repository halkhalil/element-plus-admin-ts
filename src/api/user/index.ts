import axios from "~/utils/axios";
import {useApiResources} from "~/composables/useApiResources";
import {BaseItem, UserItem} from "~/api/user/UserModel";
// import {useAxios, UseAxiosOptions} from "~/api/useAxios";
import {useAxios} from "@vueuse/integrations/useAxios";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import {reactive} from "vue";


export const api = {
  lists: ({params}): AxiosRequestConfig => {
    return {method: 'get', url: '/users', params};
  },
  item: ({id}): AxiosRequestConfig => {
    return {method: 'get', url: `/users/${id}`};
  },
  store: ({data}): AxiosRequestConfig => {
    return {method: 'post', url: `/users`, data}
  },
  update: ({id, data}): AxiosRequestConfig => {
    return {method: 'put', url: `/users/${id}`, data}
  },
  delete: ({id}): AxiosRequestConfig => {
    return {method: 'delete', url: `/users/${id}`}
  },
}

// 使用axios
export const fetchLists = (options) => axios.request(api.lists(options));
export const fetchItem = (options) => axios.request(api.item(options));
export const fetchStore = (options) => axios.request(api.store(options));
export const fetchUpdate = (options) => axios.request(api.update(options));
export const fetchDelete = (options) => axios.request(api.delete(options));

// 使用useAxios
export const useFetchLists = (options) => useAxios(api.lists(options), axios);
export const useFetchItem = (options) => useAxios(api.item(options), axios);
export const useFetchStore = (options) => useAxios(api.store(options), axios);
export const useFetchUpdate = (options) => useAxios(api.update(options), axios);
export const useFetchDelete = (options) => useAxios(api.delete(options), axios);

// 使用useApiResources实现增删改查
export const useFetchUserApiResource = (options?: object) => {
  const params = reactive({});
  const item = reactive<UserItem | {}>({})
  return useApiResources(api, axios)
}