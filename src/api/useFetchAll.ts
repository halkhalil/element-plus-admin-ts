import {AxiosRequestConfig} from "axios";
import {EasyUseAxiosReturn, StrictUseAxiosReturn, UseAxiosOptions, useAxios} from "@vueuse/integrations/useAxios";

enum Api {
  users = '/all/users',
  menus = '/all/menus',
  roles = '/all/roles',
  permissions = '/all/permissions'
}

/**
 * 用户列表
 * @param config
 * @param options
 */
export const useFetchUsers = (config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return useAxios(Api.users, config, options);
}

/**
 * 菜单列表
 * @param config
 * @param options
 */
export const useFetchMenus = (config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return useAxios(Api.menus, config, options);
}

/**
 * 角色列表
 * @param config
 * @param options
 */
export const useFetchRoles = (config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return useAxios(Api.roles, config, options);
}

/**
 * 权限列表
 * @param config
 * @param options
 */
export const useFetchPermissions = (config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return useAxios(Api.permissions, config, options);
}