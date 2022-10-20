import axios from "~/utils/axios";
import {useApiResources} from "~/composables/useApiResources";
import {AxiosPromise} from "axios";
import {RoleModel} from "~/api/model/RoleModel";

export const fetchList = (query: object = {}): AxiosPromise => axios.get('/roles', {params: query});
export const fetchItem = (item: RoleModel | null): AxiosPromise => axios.get(`/roles/${item.id}`);
export const fetchUpdate = (item: RoleModel): AxiosPromise => axios.put(`/roles/${item.id}`, {
  id: item.id,
  name: item.name,
  title: item.title,
  remark: item.remark,
  status: item.status,
  permission_ids: item.permission_ids,
});
export const fetchStore = (item: RoleModel): AxiosPromise => axios.post(`/roles`, {
  name: item.name,
  title: item.title,
  remark: item.remark,
  status: item.status,
  permission_ids: item.permission_ids,
});
export const fetchDelete = (item: RoleModel): AxiosPromise => axios.delete(`/roles/${item.id}`);

export const useFetchResource = (options = {}) => useApiResources({
  listApi: fetchList,
  itemApi: fetchItem,
  updateApi: fetchUpdate,
  storeApi: fetchStore,
  deleteApi: fetchDelete,
  ...options
});