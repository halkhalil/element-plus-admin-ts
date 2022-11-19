import {IFRAME, LAYOUT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {$t} from "~/locales";

const featureRoute: AppRouteRecordRaw[] = [
  {
    path: '/iframe',
    name: 'Feature',
    component: LAYOUT,
    redirect: '/feature/element-plus',
    meta: {title: $t('routes.demo.iframe.iframe'), icon: 'eva:external-link-fill', sort: 30},
    children: [
      {
        path: 'element-plus-iframe',
        name: 'ElementPlusIframe',
        component: IFRAME,
        meta: {title: $t('routes.demo.iframe.elementPlusIframe'), frameSrc: 'https://element-plus.gitee.io/zh-CN/'},
      },
      {
        path: 'element-plus-blank',
        name: 'ElementPlusTarget',
        meta: {title: $t('routes.demo.iframe.elementPlusBlank'), href: 'https://element-plus.gitee.io/zh-CN/'},
      },
    ]
  }
];

export default featureRoute;