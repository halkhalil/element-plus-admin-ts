import {computed} from 'vue'
import {useAppStore} from "~/store/modules/app";

export function useTabSetting() {

  const appStore = useAppStore();
  const getEnableTab = computed(() => appStore.getTabSetting.enable);

  async function setTabSetting(setting) {
    appStore.setProjectConfig({tabSetting: {...appStore.getTabSetting, ...setting}})
  }

  async function toggleEnableTab() {
    await setTabSetting({enable: !getEnableTab.value})
  }

  return {
    getEnableTab,
    toggleEnableTab,
  };
}