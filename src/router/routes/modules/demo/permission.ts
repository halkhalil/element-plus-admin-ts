import {AppRouteRecordRaw} from "~/router/types";
import {LAYOUT} from "~/router/constant";
import {RoleEnum} from "~/enums/permission";

const permissionRoute: AppRouteRecordRaw[] = [
  {
    path: '/permission',
    name: 'Permission',
    redirect: '/permission/front',
    component: LAYOUT,
    meta: {title: '权限', icon: 'ep:lock', sort: 50},
    children: [
      {
        path: 'front',
        name: 'permissionPage2',
        meta: {title: '基于前端权限'},
        component: () => import('~/views/demo/permission/frontPermission.vue'),
      },
      {
        path: 'back',
        name: 'BackPermission',
        meta: {title: '基于后端权限'},
        component: () => import('~/views/demo/permission/backPermission.vue'),
      },
      {
        path: 'auth-pageA',
        name: 'AuthPageA',
        meta: {title: '权限测试页A', roles: [RoleEnum.ADMINISTRATOR]},
        component: () => import('~/views/demo/permission/authPageA.vue'),
      },
      {
        path: 'auth-pageB',
        name: 'AuthPageB',
        meta: {title: '权限测试页B', roles: [RoleEnum.TEST]},
        component: () => import('~/views/demo/permission/authPageB.vue'),
      },
    ]
  },
];

export default permissionRoute;