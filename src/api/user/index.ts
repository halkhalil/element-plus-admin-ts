import axios from "~/utils/axios";
import {
  ApiResourcesConfig,
  ApiResourcesOptions,
  useApiResources,
  UseApiResourcesReturn
} from "~/composables/useApiResources";
import {AxiosResponse} from "axios";

export const fetchLists = ({params}): Promise<AxiosResponse> => {
  return axios.get(`/users`, {params});
}

export const fetchStore = ({data}): Promise<AxiosResponse> => {
  return axios.get(`/users`, {data});
}

export const fetchItem = ({id, params}): Promise<AxiosResponse> => {
  return axios.get(`/users/${id}`, {params});
}

export const fetchUpdate = ({id, data}): Promise<AxiosResponse> => {
  return axios.get(`/users/${id}`, {data});
}

export const fetchDelete = ({id}): Promise<AxiosResponse> => {
  return axios.get(`/users/${id}`);
}

// 使用useApiResources实现增删改查
export const useFetchUserResources = (options?: ApiResourcesOptions): UseApiResourcesReturn => {
  const apiResources: ApiResourcesConfig = {fetchLists, fetchStore, fetchItem, fetchUpdate, fetchDelete}
  return useApiResources(apiResources, options)
}