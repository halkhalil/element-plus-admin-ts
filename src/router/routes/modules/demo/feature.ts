import {LAYOUT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {$t} from "~/locales";

const featureRoute: AppRouteRecordRaw[] = [
  {
    path: '/feature',
    name: 'Feature',
    component: LAYOUT,
    redirect: '/feature/context-menu',
    meta: {title: $t('routes.demo.feature.feature'), icon: 'tabler:function', sort: 30},
    children: [
      {
        path: 'context-menu',
        name: 'ContextMenu',
        meta: {title: $t('routes.demo.feature.contextMenu')},
        component: () => import('~/views/demo/feature/context-menu/index.vue'),
      },
      {
        path: 'full-screen',
        name: 'FullScreen',
        meta: {title: $t('routes.demo.feature.fullScreen')},
        component: () => import('~/views/demo/feature/full-screen/index.vue'),
      },
      {
        path: 'clipboard',
        name: 'Clipboard',
        meta: {title: $t('routes.demo.feature.clipboard')},
        component: () => import('~/views/demo/feature/clipboard/index.vue'),
      },
      {
        path: 'click-out-side',
        name: 'ClickOutSide',
        meta: {title: $t('routes.demo.feature.clickOutSide')},
        component: () => import('~/views/demo/feature/click-out-side/index.vue'),
      },
      {
        path: 'qr-code',
        name: 'QrCode',
        meta: {title: $t('routes.demo.feature.qrCode')},
        component: () => import('~/views/demo/feature/qr-code/index.vue'),
      },
      {
        path: 'drauu',
        name: 'Drauu',
        meta: {title: $t('routes.demo.feature.drauu')},
        component: () => import('~/views/demo/feature/drauu/index.vue'),
      },
      {
        path: 'debounce',
        name: 'Debounce',
        meta: {title: $t('routes.demo.feature.debounce')},
        component: () => import('~/views/demo/feature/debounce/index.vue'),
      },
      {
        path: 'throttle',
        name: 'Throttle',
        meta: {title: $t('routes.demo.feature.throttle')},
        component: () => import('~/views/demo/feature/throttle/index.vue'),
      },
    ]
  }
];

export default featureRoute;