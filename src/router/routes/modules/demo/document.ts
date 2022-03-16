import {LAYOUT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {IFRAME} from "~/router/constant";

const pageRoute: AppRouteRecordRaw[] = [
  {
    path: '/document',
    name: 'Document',
    component: LAYOUT,
    meta: {title: '文档', icon: 'el-compass', sort: 40},
    children: [
      {
        path: 'element-plus',
        name: 'ElementPlusIframe',
        component: IFRAME,
        meta: {title: 'Element-Plus 内嵌',frameSrc:'https://element-plus.gitee.io/zh-CN/'},
      },
      {
        path: 'element-plus-blank',
        name: 'ElementPlusTarget',
        meta: {title: 'Element-Plus 外链',href:'https://element-plus.gitee.io/zh-CN/'},
      },
    ]
  }
];

export default pageRoute;