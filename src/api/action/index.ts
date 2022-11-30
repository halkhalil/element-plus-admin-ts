import axios from "~/utils/axios";
import {ApiResourcesOptions, UseApiResourcesReturn, useApiResources,} from "~/composables/useApiResources";
import {AxiosResponse} from "axios";

export const fetchLists = ({params}): Promise<AxiosResponse> => {
  return axios.get(`/actions`, {params});
}

export const fetchStore = ({data}): Promise<AxiosResponse> => {
  return axios.post(`/actions`, data);
}

export const fetchItem = ({id, params}): Promise<AxiosResponse> => {
  return axios.get(`/actions/${id}`, {params});
}

export const fetchUpdate = ({data}): Promise<AxiosResponse> => {
  return axios.put(`/actions/${data.id}`, data);
}

export const fetchDelete = ({id}): Promise<AxiosResponse> => {
  return axios.delete(`/actions/${id}`);
}

// 使用useApiResources实现增删改查
export const useFetchActionResources = (options?: ApiResourcesOptions): UseApiResourcesReturn => {
  return useApiResources({
    fetchLists,
    fetchStore,
    fetchItem,
    fetchUpdate,
    fetchDelete
  }, options)
}