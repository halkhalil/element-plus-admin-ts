import {createRouter, createWebHistory} from 'vue-router'
import {basicRoutes} from '~/router/routes';
import {App} from "vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  routes: basicRoutes,
})

export function setupRouter(app: App<Element>) {
  app.use(router);
}