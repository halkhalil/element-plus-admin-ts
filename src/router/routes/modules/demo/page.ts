import Layout from "~/layouts/bak/index.vue";
import LayoutContent from "~/layouts/page/index.vue"
import {AppRouteRecordRaw} from "~/router/types";

const pageRoute: AppRouteRecordRaw[] = [
  {
    path: '/page',
    name: 'Page',
    component: Layout,
    redirect: '/error-page',
    meta: {title: '页面', icon: 'el-compass', sort:40},
    children: [
      {
        path: 'personal',
        name: 'Personal',
        component: LayoutContent,
        meta: {title: '个人页'},
        children: [
          {
            path: 'center',
            name: 'PersonalCenter',
            component: () => import('~/views/demo/page/personal/center/index.vue'),
            meta: {title: '个人中心'}
          },
          {
            path: 'setting',
            name: 'PersonalSetting',
            component: () => import('~/views/demo/page/personal/setting/index.vue'),
            meta: {title: '个人设置'}
          },
        ]
      },
      {
        path: 'form',
        name: 'FormPage',
        component: LayoutContent,
        meta: {title: '表单页'},
        children: [
          {
            path: 'basic',
            name: 'BasicFormPage',
            meta: {title: '基础表单'},
            component: () => import('~/views/demo/page/form/basic/index.vue'),
          },
          {
            path: 'step',
            name: 'StepFormPage',
            meta: {title: '分步表单'},
            component: () => import('~/views/demo/page/form/step/index.vue'),
          },
        ]
      },
      {
        path: 'list',
        name: 'list-page',
        component: LayoutContent,
        meta: {title: '列表页'},
        children: [
          {
            path: 'basic',
            name: 'BasicListPage',
            meta: {title: '基础表单'},
            component: () => import('~/views/demo/page/form/basic/index.vue'),
          },
          {
            path: 'step',
            name: 'BasicStepPage',
            meta: {title: '分步表单'},
            component: () => import('~/views/demo/page/form/step/index.vue'),
          },
        ]
      },
      {
        path: 'error',
        name: 'Error',
        component: LayoutContent,
        meta: {title: '错误页'},
        children: [
          {
            path: '403',
            name: '403Page',
            meta: {title: '403'},
            component: () => import('~/views/demo/page/error/403.vue'),
          },
          {
            path: '404',
            name: '404Page',
            meta: {title: '404'},
            component: () => import('~/views/demo/page/error/404.vue'),
          },
        ]
      },
    ]
  }
];

export default pageRoute;