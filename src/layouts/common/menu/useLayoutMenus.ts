import {useStore} from "~/store";

export function useLayoutMenus() {
  const {permissionStore} = useStore()
  const getMenus = permissionStore.getMenus;

  return {
    getMenus
  }
}