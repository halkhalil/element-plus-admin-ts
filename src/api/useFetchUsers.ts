// import {useAxios, AxiosOptions} from "~/api/useAxios";
import useFetch from "~/composables/useFetch.js";
import {reactive} from "vue";
import {AxiosRequestConfig} from "axios";
import {EasyUseAxiosReturn, StrictUseAxiosReturn, UseAxiosOptions,useAxios} from "@vueuse/integrations/useAxios";

const listApi = (query = {}) => axios.get('/users', {params: query});
const itemApi = (item = {}) => axios.get(`/users/${item.id}`);
const updateApi = (item = {}) => axios.put(`/users/${item.id}`, {
    id: item.id,
    username: item.username,
    nickname: item.nickname,
    password: item.password,
    status: item.status,
    role_ids: item.role_ids,
});
const storeApi = (item = {}) => axios.post(`/users`, {
    username: item.username,
    nickname: item.nickname,
    password: item.password,
    status: item.status,
    role_ids: item.role_ids,
});
const deleteApi = (item = {}) => axios.delete(`/users/${item.id}`);

export {
    listApi,
    itemApi,
    updateApi,
    storeApi,
    deleteApi,
}

interface userData {
    id?: string | number | null,
    username: string,
    nickname: string,
    password?: string,
    status: boolean,
    role_ids: string[] | number[],
}

const Api = {
    list: {url: '/users', method: 'get'},
    store: {url: '/users', method: 'post'},
    item: {url: '/users/:id', method: 'get'},
    update: {url: '/users/:id', method: 'put'},
    delete: {url: '/users/:id', method: 'delete'},
}

export const useFetchList2 = ({params}) => useAxios(Api.list.url,{params});

export const useFetchList = (options) => useAxios({...options, ...Api.list} as AxiosOptions);
export const useFetchItem = (options) => useAxios({...options, ...Api.item} as AxiosOptions);
export const useFetchStore = (options) => useAxios({...options, ...Api.store} as AxiosOptions);
export const useFetchUpdate = (options) => useAxios({...options, ...Api.update} as AxiosOptions);
export const useFetchDelete = (options) => useAxios({...options, ...Api.delete} as AxiosOptions);

export const useFetchResource = (
    useFetchList,
    useFetchItem,
    useFetchStore,
    useFetchUpdate,
    useFetchDelete,
) => {
}