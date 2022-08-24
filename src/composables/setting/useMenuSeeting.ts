import {computed, unref} from 'vue'
import {useAppStore} from "~/store/modules/app";
import {MenuSetting} from "#/config";

export function useMenuSetting() {

  const appStore = useAppStore();
  const getMenuSetting = appStore.getMenuSetting;
  const getCollapsed = computed(() => getMenuSetting.collapse);
  const getMenuMode = computed(() => getMenuSetting.mode);

  /**
   * 菜单设置
   * @param setting
   */
  async function setMenuSetting(setting: Partial<MenuSetting>) {
    appStore.setProjectConfig({menuSetting: {...getMenuSetting, ...setting}})
  }

  // 菜单水平折叠收起
  async function toggleCollapsed() {
    await setMenuSetting({collapse: !getCollapsed.value});
  }

  return {
    setMenuSetting,
    toggleCollapsed,
    getMenuSetting,
    getCollapsed,
    getMenuMode,
  };
}