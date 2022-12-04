import {LAYOUT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {$t} from "~/locales";

const systemRoute: AppRouteRecordRaw[] = [
  {
    path: '/routine',
    name: 'Routine',
    redirect: '/routine/config',
    component: LAYOUT,
    meta: {title: $t('routes.system.system'), icon: 'ant-design:windows-outlined', sort: 20},
    children: [
      {
        path: 'configs',
        name: 'Config',
        meta: {title: $t('routes.system.config')},
        component: () => import('~/views/routine/configs/index.vue'),
      }
    ]
  },
];

export default systemRoute;