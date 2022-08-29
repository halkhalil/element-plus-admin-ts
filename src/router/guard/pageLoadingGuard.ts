import {unref} from 'vue'
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting";
import type {Router} from "vue-router";
import {useStore} from "~/store";


export function createPageLoadingGuard(router: Router) {
  const {appStore} = useStore();
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