import {useAxios} from "@vueuse/integrations/useAxios";
import axios from "~/utils/axios";
import {computed} from "vue";

enum Api {
  users = '/all/users',
  menus = '/all/menus',
  roles = '/all/roles',
  permissions = '/all/permissions'
}

export const useFetchUsers = (params?: any) => useAxios(Api.users, {params}, axios, {immediate: false})

export const useFetchMenus = (params?: any) => useAxios(Api.menus, {params}, axios, {immediate: false})

export const useFetchRoles = (params?: any) => {
  const axiosReturn = useAxios(Api.roles, {params}, axios, {immediate: false});
  const roles = computed(() => (axiosReturn.data.value?.data || []).map(item => ({
    label: item.label,
    value: item.id
  })));
  return {
    roles,
    ...axiosReturn,
  }
}

export const useFetchPermissions = (params?: any) => useAxios(Api.permissions, {params}, axios, {immediate: false})