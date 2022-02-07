import {Router} from "vue-router";

export function createPageGuard(router: Router) {
  const loadedPageMap = new Map;
  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path);
    return true;
  });

  router.afterEach(async (to) => {
    loadedPageMap.set(to.path, true);
    return true;
  });
}