import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {basicRoutes} from '~/router/routes';
import {App} from "vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({left: 0, top: 0}),
})

export const setupRouter = (app: App<Element>) => {
  app.use(router);
}

export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}