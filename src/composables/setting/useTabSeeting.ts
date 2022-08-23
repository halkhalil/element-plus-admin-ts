import {computed, unref} from 'vue'
import store from "~/store_bak";

export function useTabSetting() {

  const {dispatch, getters} = store;
  const getTabSetting = computed(() => getters.getTabSetting);
  const getEnableTab = computed(() => unref(getTabSetting)?.enable);

  async function setTabSetting(options) {
    const tabSetting = {...unref(getTabSetting), ...options};
    await dispatch('app/setProjectConfig', {tabSetting});
  }

  async function toggleEnableTab() {
    await setTabSetting({enable: !unref(getEnableTab)})
  }

  return {
    getEnableTab,
    toggleEnableTab,
  };
}