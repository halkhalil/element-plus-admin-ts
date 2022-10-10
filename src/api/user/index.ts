import axios from "~/utils/axios";
import {useApiResources} from "~/composables/useApiResources";
import {BaseItem, UserItem} from "~/api/user/UserModel";
// import {useAxios, UseAxiosOptions} from "~/api/useAxios";
import {useAxios} from "@vueuse/integrations/useAxios";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import {reactive} from "vue";


export enum Api {
  list = '/users',
  item = '/users/:id'
}

export const api = {
  lists: ({params}) => ({method: 'get', url: '/users', params}) as AxiosRequestConfig,
  item: ({id}) => ({method: 'get', url: `/users/${id}`} as AxiosRequestConfig),
  store: ({data}) => ({method: 'post', url: `/users`, data}) as AxiosRequestConfig,
  update: ({id, data}) => ({method: 'put', url: `/users/${id}`, data}) as AxiosRequestConfig,
  delete: ({id}) => ({method: 'delete', url: `/users/${id}`}) as AxiosRequestConfig,
}

export const fetchLists = (options) => axios.request(api.lists(options));
export const fetchItem = (options) => axios.request(api.item(options));
export const fetchStore = (options) => axios.request(api.store(options));
export const fetchUpdate = (options) => axios.request(api.update(options));
export const fetchDelete = (options) => axios.request(api.delete(options));

export const useFetchLists = ({params}) => useAxios(api.lists({params}), axios);
export const useFetchItem = ({id}) => useAxios(api.item({id}), axios);
export const useFetchStore = ({data}) => useAxios(api.store({data}), axios);
export const useFetchUpdate = ({id, data}) => useAxios(api.update({id, data}), axios);
export const useFetchDelete = (id) => useAxios(api.delete(id), axios);

export const useFetchUserApiResource = (options?: object) => {
  const params = reactive({});
  const item = reactive<UserItem | {}>({})
  return useApiResources(api, axios)
}