import axios from "~/utils/axios";
import {
  ApiResourcesConfig,
  ApiResourcesOptions,
  useApiResources,
  UseApiResourcesReturn
} from "~/composables/useApiResources";
import {AxiosResponse} from "axios";

export const fetchLists = ({params}): Promise<AxiosResponse> => {
  return axios.get(`/menus`, {params});
}

export const fetchStore = ({data}): Promise<AxiosResponse> => {
  return axios.post(`/menus`, data);
}

export const fetchItem = ({id, params}): Promise<AxiosResponse> => {
  return axios.get(`/menus/${id}`, {params});
}

export const fetchUpdate = ({data}): Promise<AxiosResponse> => {
  return axios.put(`/menus/${data.id}`, data);
}

export const fetchDelete = ({id}): Promise<AxiosResponse> => {
  return axios.delete(`/menus/${id}`);
}

// 使用useApiResources实现增删改查
export const useFetchMenuResources = (options?: ApiResourcesOptions): UseApiResourcesReturn => {
  const apiResources: ApiResourcesConfig = {fetchLists, fetchStore, fetchItem, fetchUpdate, fetchDelete}
  return useApiResources(apiResources, options)
}