import Layout from "~/layouts/index.vue";
import {AppRouteRecordRaw} from "~/router/types";

const permissionRoute: AppRouteRecordRaw[] = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    meta: {title: '权限', icon: 'el-lock', menu: true},
    children: [
      {
        path: 'page',
        name: 'permission-page',
        meta: {title: '页面权限', menu: true, affix: false},
        component: () => import('~/views/demo/permission/page.vue'),
      },
      {
        path: 'button',
        name: 'permission-button',
        meta: {title: '按钮权限', menu: true, affix: false},
        component: () => import('~/views/demo/permission/button.vue'),
      },
    ]
  },
];

export default permissionRoute;