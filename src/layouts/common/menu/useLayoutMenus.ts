import {usePermissionStore} from "~/store/modules/permission";

export function useLayoutMenus() {
  const permissionStore = usePermissionStore();
  const getMenus = permissionStore.getMenus;

  return {
    getMenus
  }
}