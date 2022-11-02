import axios from "~/utils/axios";
import {
  ApiResourcesConfig,
  ApiResourcesOptions,
  useApiResources,
  UseApiResourcesReturn
} from "~/composables/useApiResources";
import {AxiosResponse} from "axios";

export const fetchLists = ({params}): Promise<AxiosResponse> => {
  return axios.get(`/configs`, {params});
}

export const fetchStore = ({data}): Promise<AxiosResponse> => {
  return axios.post(`/configs`, data);
}

export const fetchItem = ({id, params}): Promise<AxiosResponse> => {
  return axios.get(`/configs/${id}`, {params});
}

export const fetchUpdate = ({data}): Promise<AxiosResponse> => {
  return axios.put(`/configs/${data.id}`, data);
}

export const fetchDelete = ({id}): Promise<AxiosResponse> => {
  return axios.delete(`/configs/${id}`);
}

export const fetchGroupLists = ({params}) => {
  return axios.get(`/configs/groups`, {params});
}

export const fetchGroupUpdate = ({data}) => {
  return axios.put(`/configs/groups`, data);
}

export const fetchConfigItems = (query = {}) => axios.get('/configs/items', {params: query});

// 使用useApiResources实现增删改查
export const useFetchConfigResources = (options?: ApiResourcesOptions): UseApiResourcesReturn => {
  const apiResources: ApiResourcesConfig = {fetchLists, fetchStore, fetchItem, fetchUpdate, fetchDelete}
  return useApiResources(apiResources, options)
}


export const useFetchConfigGroupResources = (options?: ApiResourcesOptions) => {
  const apiResources: ApiResourcesConfig = {fetchLists: fetchGroupLists, fetchUpdate: fetchGroupUpdate}
  return useApiResources(apiResources, options)
}