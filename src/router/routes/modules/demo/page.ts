import {LAYOUT} from "~/router/constant";
import LayoutContent from "~/layouts/page/index.vue"
import {AppRouteRecordRaw} from "~/router/types";
import {$t} from "~/locales";

const pageRoute: AppRouteRecordRaw[] = [
  {
    path: '/page',
    name: 'Page',
    component: LAYOUT,
    redirect: '/page/personal/center',
    meta: {title: $t('routes.demo.page.page'), icon: 'ep:document', sort: 40},
    children: [
      {
        path: 'personal',
        name: 'Personal',
        component: LayoutContent,
        meta: {title: $t('routes.demo.page.personal.personal')},
        children: [
          {
            path: 'center',
            name: 'PersonalCenter',
            component: () => import('~/views/demo/page/personal/center/index.vue'),
            meta: {title: $t('routes.demo.page.personal.center')}
          },
          {
            path: 'setting',
            name: 'PersonalSetting',
            component: () => import('~/views/demo/page/personal/setting/index.vue'),
            meta: {title: $t('routes.demo.page.personal.setting')}
          },
        ]
      },
      {
        path: 'form',
        name: 'FormPage',
        component: LayoutContent,
        meta: {title: $t('routes.demo.page.form.form')},
        children: [
          {
            path: 'basic-form',
            name: 'BasicFormPage',
            meta: {title: $t('routes.demo.page.form.basic')},
            component: () => import('~/views/demo/page/form/basic/index.vue'),
          },
          {
            path: 'step-form',
            name: 'StepFormPage',
            meta: {title: $t('routes.demo.page.form.step')},
            component: () => import('~/views/demo/page/form/step/index.vue'),
          },
        ]
      },
      {
        path: 'list',
        name: 'list-page',
        component: LayoutContent,
        meta: {title: $t('routes.demo.page.list.list')},
        children: [
          {
            path: 'basic',
            name: 'BasicListPage',
            meta: {title: $t('routes.demo.page.list.basic')},
            component: () => import('~/views/demo/page/form/basic/index.vue'),
          },
        ]
      },
      {
        path: 'error',
        name: 'Error',
        component: LayoutContent,
        meta: {title: $t('routes.demo.page.error')},
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