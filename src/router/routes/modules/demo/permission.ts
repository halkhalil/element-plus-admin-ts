import Layout from "~/layouts/index.vue";
import {AppRouteRecordRaw} from "~/router/types";

const permissionRoute: AppRouteRecordRaw[] = [
  {
    path: '/permission',
    name: 'Permission',
    redirect: '/permission/page',
    component: Layout,
    meta: {title: '权限', icon: 'el-lock', sort: 50},
    children: [
      {
        path: 'page',
        name: 'permissionPage',
        meta: {title: '页面权限'},
        component: () => import('~/views/demo/permission/page.vue'),
      },
      {
        path: 'button',
        name: 'PermissionButton',
        meta: {title: '按钮权限'},
        component: () => import('~/views/demo/permission/button.vue'),
      },
    ]
  },
];

export default permissionRoute;