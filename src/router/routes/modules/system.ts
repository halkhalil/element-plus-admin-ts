import {LAYOUT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {$t} from "~/locales";

const systemRoute: AppRouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    redirect: '/system/users',
    component: LAYOUT,
    meta: {title: $t('routes.system.system'), icon: 'ant-design:windows-outlined', sort: 20},
    children: [
      {
        path: 'users',
        name: 'Users',
        meta: {title: $t('routes.system.user')},
        component: () => import('~/views/permission/users/index.vue'),
      },
      {
        path: 'roles',
        name: 'Roles',
        meta: {title: $t('routes.system.role')},
        component: () => import('~/views/permission/roles/index.vue'),
      },
      {
        path: 'menus',
        name: 'Menus',
        meta: {title: $t('routes.system.menu')},
        component: () => import('~/views/permission/menus/index.vue'),
      },
      {
        path: 'actions',
        name: 'Actions',
        meta: {title: $t('routes.system.action')},
        component: () => import('~/views/permission/actions/index.vue'),
      },
      {
        path: 'nodes',
        name: 'Nodes',
        meta: {title: $t('routes.system.permission')},
        component: () => import('~/views/permission/nodes/index.vue'),
      },
    ]
  },
];

export default systemRoute;