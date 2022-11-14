import {LAYOUT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {$t} from '~/composables/useI18n';

const dashboardRoute: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LAYOUT,
    redirect: '/dashboard/workplace',
    meta: {title: $t('routes.dashboard.dashboard'),icon: 'ant-design:dashboard-outlined', sort: 100},
    children: [
      {
        path: 'analysis',
        name: 'analysis',
        meta: {title: $t('routes.dashboard.analysis'), icon: 'ep:data-analysis', affix: true},
        component: () => import('~/views/dashboard/analysis/index.vue'),
      },
      {
        path: 'workplace',
        name: 'workplace',
        meta: {title: $t('routes.dashboard.workplace'), icon: 'simple-icons:workplace'},
        component: () => import('~/views/dashboard/workplace/index.vue'),
      },
      {
        path: 'monitor',
        name: 'monitor',
        meta: {title: $t('routes.dashboard.monitor'), icon: 'ep:monitor'},
        component: () => import('~/views/dashboard/monitor/index.vue'),
      },
    ]
  },
];

export default dashboardRoute;