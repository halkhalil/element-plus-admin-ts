// import Layout from "~/layouts/index.vue";
import {AppRouteRecordRaw} from "~/router/types";
import {LAYOUT, getParentLayout, CONTENT} from "~/router/constant";

const permissionRoute: AppRouteRecordRaw[] = [
  {
    path: '/permission',
    name: 'Permission',
    redirect: '/permission/page',
    component: LAYOUT,
    meta: {title: '权限', icon: 'el-lock', sort: 50},
    children: [
      {
        path: 'front',
        name: 'permissionPage2',
        meta: {title: '基于前端权限'},
        component: CONTENT,
        redirect: '/permission/front/page',
        children: [
          {
            path: 'page',
            name: 'FrontPermissionPage',
            meta: {title: '页面权限'},
            component: () => import('~/views/demo/permission/page.vue'),
          },
          {
            path: 'button',
            name: 'FrontPermissionButton',
            meta: {title: '按钮权限'},
            component: () => import('~/views/demo/permission/button.vue'),
          },
        ]
      },
      {
        path: 'back',
        name: 'BackPermission',
        meta: {title: '基于后端权限'},
        component: CONTENT,
        redirect: '/permission/back/page',
        children: [
          {
            path: 'page',
            name: 'BackPermissionPage',
            meta: {title: '页面权限'},
            component: () => import('~/views/demo/permission/page.vue'),
          },
          {
            path: 'button',
            name: 'BackPermissionButton',
            meta: {title: '按钮权限'},
            component: () => import('~/views/demo/permission/button.vue'),
          },
        ]
      },
    ]
  },
];

export default permissionRoute;