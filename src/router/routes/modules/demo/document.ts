import Layout from "~/layouts/default/index.vue";
import LayoutContent from "~/layouts/page/index.vue"
import {AppRouteRecordRaw} from "~/router/types";

const pageRoute: AppRouteRecordRaw[] = [
  {
    path: '/document',
    name: 'Document',
    component: Layout,
    meta: {title: '文档', icon: 'el-compass', sort: 40},
    children: [
      {
        path: 'element-plus',
        name: 'ElementPlus',
        component: () => import('~/views/sys/iframe/index.vue'),
        meta: {title: '个人页'},
      },
      {
        path: 'vue',
        name: 'Vue',
        component: () => import('~/views/sys/iframe/index.vue'),
        meta: {title: '个人页'},
      },
    ]
  }
];

export default pageRoute;