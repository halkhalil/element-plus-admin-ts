import {LAYOUT, CONTENT, ROOT_NAME, LOGIN_NAME, REDIRECT_NAME, NOT_FOUND_NAME} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {PageEnum} from "~/enums/page";

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: LOGIN_NAME,
  meta: {title: 'login'},
  component: () => import('~/views/login/index.vue'),
}

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: ROOT_NAME,
  redirect: PageEnum.HOME,
  meta: {title: 'Root'},
}

export const NotFoundRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  component: LAYOUT,
  meta: {title: 'ErrorPage'},
  children: [
    {
      path: '/:path(.*)*',
      name: NOT_FOUND_NAME,
      component: () => import('~/views/demo/page/error/404.vue'),
      meta: {title: 'ErrorPage'},
    },
  ],
}

export const RedirectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  component: CONTENT,
  meta: {title: 'redirect'},
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      meta: {title: 'redirect'},
      component: () => import('~/views/core/redirect/index.vue')
    }
  ]
}

const basicRoute: AppRouteRecordRaw[] = [
  LoginRoute,
  RootRoute,
  RedirectRoute,
  NotFoundRoute,
];
export default basicRoute;