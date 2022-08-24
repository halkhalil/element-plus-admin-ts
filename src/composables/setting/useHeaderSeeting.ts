import {computed, unref} from 'vue'
import {useAppStore} from "~/store/modules/app";

export function useHeaderSetting() {

  const appStore = useAppStore();

  const getHeaderSetting = appStore.getHeaderSetting;
  const getHeaderFixed = computed(() => appStore.getHeaderSetting?.fixed);

  function setHeaderSetting(options) {
    appStore.setProjectConfig({headerSetting: {...getHeaderSetting, ...options}})
  }

  async function toggleHeaderFixed() {
    await setHeaderSetting({fixed: !unref(getHeaderFixed)});
  }

  return {
    toggleHeaderFixed,

    getHeaderSetting,
    getHeaderFixed,
  };
}