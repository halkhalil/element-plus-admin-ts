import {LAYOUT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";

const dashboardRoute: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LAYOUT,
    redirect: '/dashboard/workplace',
    meta: {title: '首页', icon: 'el-home', sort: 10},
    children: [
      {
        path: 'analysis',
        name: 'analysis',
        meta: {title: '分析页', affix: true},
        component: () => import('~/views/dashboard/analysis/index.vue'),
      },
      {
        path: 'workplace',
        name: 'workplace',
        meta: {title: '工作台'},
        component: () => import('~/views/dashboard/workplace/index.vue'),
      },
      {
        path: 'monitor',
        name: 'monitor',
        meta: {title: '监控页'},
        component: () => import('~/views/dashboard/monitor/index.vue'),
      },
    ]
  },
];

export default dashboardRoute;