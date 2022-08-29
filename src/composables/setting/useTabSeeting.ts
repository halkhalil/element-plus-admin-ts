import {computed} from 'vue'
import {useStore} from "~/store";

export function useTabSetting() {

  const {appStore} = useStore();
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