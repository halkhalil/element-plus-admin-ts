import {useAxios} from "@vueuse/integrations/useAxios";
import axios from "~/utils/axios";

enum Api {
  users = '/all/users',
  menus = '/all/menus',
  roles = '/all/roles',
  permissions = '/all/permissions'
}

export const useFetchUsers = (params?: any) => useAxios(Api.users, {params}, axios, {immediate: false})

export const useFetchMenus = (params?: any) => useAxios(Api.menus, {params}, axios, {immediate: false})

export const useFetchRoles = (params?: any) => useAxios(Api.roles, {params}, axios, {immediate: false})

export const useFetchPermissions = (params?: any) => useAxios(Api.permissions, {params}, axios, {immediate: false})