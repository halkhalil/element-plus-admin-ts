import {computed} from 'vue'
import {MenuSetting} from "#/config";
import {useStore} from "~/store";

export function useMenuSetting() {

  const {appStore} = useStore();
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