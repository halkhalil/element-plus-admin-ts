import {unref} from 'vue'
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting";
import store from "~/store";
import {Router} from "vue-router";


export function createPageLoadingGuard(router:Router) {
  const {getOpenPageLoading} = useTransitionSetting();
  router.beforeEach(async ({meta}) => {
    if (meta.loaded) return true;
    if (unref(getOpenPageLoading)) await store.dispatch('app/setPageLoading', true);
    return true;
  });

  router.afterEach(async ({meta}) => {
    if (meta.loaded) return true;
    if (unref(getOpenPageLoading)) {
      setTimeout(async () => {
        await store.dispatch('app/setPageLoading', false);
      }, 1000);
    }
    return true;
  });
}