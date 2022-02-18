import {LAYOUT,CONTENT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {PageEnum} from "~/enums/page";

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  meta: {title: 'login'},
  component: () => import('~/views/login/index.vue'),
}

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.HOME,
  meta: {title: 'Root'},
}


export const NotFoundRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: LAYOUT,
  meta: {title: 'ErrorPage'},
  children: [
    {
      path: '/:path(.*)*',
      name: 'NotFound',
      component: () => import('~/views/demo/page/error/404.vue'),
      meta: {title: 'ErrorPage'},
    },
  ],
}

export const RedirectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  name: 'RedirectTo',
  component: CONTENT,
  meta: {title: 'redirect'},
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      meta: {title: 'redirect'},
      component: () => import('~/views/sys/redirect/index.vue')
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