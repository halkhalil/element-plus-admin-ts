import {computed, unref} from "vue";
import store from "~/store";
import {isString} from "~/utils/is";
import {PermissionEnum, PermissionModeEnum, RoleEnum} from "~/enums/permission";
import projectSetting from '~/settings/projectSetting';

type Permission = RoleEnum | PermissionEnum | string;

export function usePermission() {
  const {getters, dispatch} = store;
  const permissionMode = projectSetting.permissionMode;

  /**
   * 权限校验
   * @param value
   * @param def
   */
  const hasPermission = (value?: Permission | Permission[], def = true): boolean => {
    if (!value) return def;

    const checks = isString(value) ? [value] : value;

    if (permissionMode == PermissionModeEnum.FRONT_MENU) {
      const getRoles = computed(() => getters.getRoles);
      return unref(getRoles).some(item => checks.includes(item as RoleEnum));
    }

    if (permissionMode == PermissionModeEnum.BACK_MENU) {
      const getPermissions = computed(() => getters.getPermissions);
      return unref(getPermissions).some(item => checks.includes(item as PermissionEnum));
    }

    return true;
  }

  const changeRoles = async (roles: RoleEnum | RoleEnum[]) => {
    const _roles = isString(roles) ? [roles] : roles;
    await dispatch('user/setRoles', _roles);
  }

  return {
    hasPermission,
    changeRoles,
  }
}