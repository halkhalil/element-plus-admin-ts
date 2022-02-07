import nProgress from 'nprogress';
import 'nprogress/nprogress.css'
import {unref} from 'vue'
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting";
import {Router} from "vue-router";

export function createProgressGuard(router: Router) {
  const {getOpenNProgress} = useTransitionSetting();
  router.beforeEach(async ({meta}) => {
    if (meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async ({meta}) => {
    if (meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}