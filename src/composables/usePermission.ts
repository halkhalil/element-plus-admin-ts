import {computed, unref} from "vue";
import {isString} from "~/utils/is";
import {PermissionEnum, PermissionModeEnum, RoleEnum} from "~/enums/permission";
import {resetRouter, router} from "~/router";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {RouteRecordRaw} from "vue-router";
import {useStore} from "~/store";

type Permission = RoleEnum | PermissionEnum | string;

export function usePermission() {
  const {userStore, permissionStore} = useStore();
  const {getPermissionMode} = useRootSetting();
  const getPermissions = computed(() => permissionStore.getPermissions);
  const getRoles = computed(() => userStore.getRoles);

  /**
   * 权限校验
   * @param value
   * @param def
   */
  const hasPermission = (value?: Permission | Permission[], def = true): boolean => {
    if (!value) return def;
    const checks = isString(value) ? [value] : value;
    if (getPermissionMode.value == PermissionModeEnum.FRONT_MENU) {
      const getRoles = computed(() => userStore.getRoles);
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
    userStore.setRoles(_roles as RoleEnum[])
    resetRouter();
    const routes = await permissionStore.buildRoutes();
    routes.forEach(route => router.addRoute(route as unknown as RouteRecordRaw));
  }

  return {
    hasPermission,
    changeRoles,
    getPermissions,
    getRoles,
    getPermissionMode,
  }
}