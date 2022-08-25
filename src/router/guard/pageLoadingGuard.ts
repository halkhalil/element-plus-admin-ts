import {unref} from 'vue'
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting";
import type {Router} from "vue-router";
import {useAppStore} from "~/store/modules/app";


export function createPageLoadingGuard(router: Router) {
  const appStore = useAppStore();
  const {getOpenPageLoading} = useTransitionSetting();
  router.beforeEach(async ({meta}) => {
    if (meta.loaded) return true;
    if (unref(getOpenPageLoading)) appStore.setPageLoading(true);
    return true;
  });

  router.afterEach(async ({meta}) => {
    if (meta.loaded) return true;
    if (unref(getOpenPageLoading)) {
      setTimeout(async () => {
        appStore.setPageLoading(false)
      }, 1000);
    }
    return true;
  });
}