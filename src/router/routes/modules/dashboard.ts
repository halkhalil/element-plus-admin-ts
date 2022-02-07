import Layout from "~/layouts/index.vue";
import {AppRouteRecordRaw} from "~/router/types";
const dashboardRoute: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/workplace',
    meta: {title: '首页', icon: 'el-home', menu: true},
    children: [
      {
        path: 'analysis',
        name: 'analysis',
        meta: {title: '分析页', menu: true, affix: true},
        component: () => import('~/views/dashboard/analysis/index.vue'),
      },
      {
        path: 'workplace',
        name: 'workplace',
        meta: {title: '工作台', menu: true},
        component: () => import('~/views/dashboard/workplace/index.vue'),
      },
      {
        path: 'monitor',
        name: 'monitor',
        meta: {title: '监控页', menu: true},
        component: () => import('~/views/dashboard/monitor/index.vue'),
      },
    ]
  },
];

export default dashboardRoute;