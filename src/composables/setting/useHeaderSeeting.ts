import {computed, unref} from 'vue'
import {useStore} from "~/store";

export function useHeaderSetting() {

  const {appStore} = useStore();

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