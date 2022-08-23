import {computed, unref} from "vue";
import store from "~/store_bak";
import {isString} from "~/utils/is";
import {PermissionEnum, PermissionModeEnum, RoleEnum} from "~/enums/permission";
import {resetRouter, router} from "~/router";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

type Permission = RoleEnum | PermissionEnum | string;

export function usePermission() {
  const {getters, dispatch} = store;
  const {getPermissionMode} = useRootSetting();
  const getPermissions = computed(() => getters.getPermissions);
  const getRoles = computed(() => getters.getRoles);

  /**
   * 权限校验
   * @param value
   * @param def
   */
  const hasPermission = (value?: Permission | Permission[], def = true): boolean => {
    if (!value) return def;
    const checks = isString(value) ? [value] : value;
    if (getPermissionMode.value == PermissionModeEnum.FRONT_MENU) {
      const getRoles = computed(() => getters.getRoles);
      return unref(getRoles).some(item => checks.includes(item as RoleEnum));
    }

    if (getPermissionMode.value == PermissionModeEnum.BACK_MENU) {
      return unref(getPermissions).some(item => checks.includes(item as PermissionEnum));
    }

    return true;
  }

  /**
   * 更改角色
   * @param roles
   */
  const changeRoles = async (roles: RoleEnum | RoleEnum[]) => {
    const _roles = isString(roles) ? [roles] : roles;
    await dispatch('user/setRoles', _roles);
    resetRouter();
    const routes = await dispatch('permission/buildRoutes');
    routes.forEach(route => router.addRoute(route));
  }

  return {
    hasPermission,
    changeRoles,
    getPermissions,
    getRoles,
    getPermissionMode,
  }
}