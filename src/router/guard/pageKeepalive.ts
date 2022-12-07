import {Router} from "vue-router";

/**
 * 实现多级路由缓存
 * @param router
 */
export function createPageKeepalive(router: Router) {

  function handleKeepAlive(to) {
    if (to.matched && to.matched.length > 2) {
      for (let i = 0; i < to.matched.length; i++) {
        const element = to.matched[i]
        if (element.components.default.name === 'PageLayout') {
          to.matched.splice(i, 1)
          handleKeepAlive(to)
        }
      }
    }
  }

  router.beforeEach(async (to) => {
    handleKeepAlive(to)
    return true;
  });

  router.afterEach(async (to) => {
    return true;
  });
}