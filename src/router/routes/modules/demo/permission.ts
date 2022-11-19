import {AppRouteRecordRaw} from "~/router/types";
import {LAYOUT} from "~/router/constant";
import {RoleEnum} from "~/enums/permission";
import {$t} from "~/locales";

const permissionRoute: AppRouteRecordRaw[] = [
  {
    path: '/permission',
    name: 'Permission',
    redirect: '/permission/front',
    component: LAYOUT,
    meta: {title: $t('routes.demo.permission.permission'), icon: 'ep:lock', sort: 50},
    children: [
      {
        path: 'front',
        name: 'permissionPage2',
        meta: {title: $t('routes.demo.permission.frontend')},
        component: () => import('~/views/demo/permission/frontPermission.vue'),
      },
      {
        path: 'back',
        name: 'BackPermission',
        meta: {title: $t('routes.demo.permission.backend')},
        component: () => import('~/views/demo/permission/backPermission.vue'),
      },
      {
        path: 'auth-pageA',
        name: 'AuthPageA',
        meta: {title: $t('routes.demo.permission.testPageA'), roles: [RoleEnum.ADMINISTRATOR]},
        component: () => import('~/views/demo/permission/authPageA.vue'),
      },
      {
        path: 'auth-pageB',
        name: 'AuthPageB',
        meta: {title: $t('routes.demo.permission.testPageB'), roles: [RoleEnum.TEST]},
        component: () => import('~/views/demo/permission/authPageB.vue'),
      },
    ]
  },
];

export default permissionRoute;