import {LAYOUT} from "~/router/constant";
import LayoutContent from "~/layouts/page/index.vue"
import {AppRouteRecordRaw} from "~/router/types";

const componentRoute: AppRouteRecordRaw[] = [
  {
    path: '/component',
    name: 'Component',
    component: LAYOUT,
    redirect: '/component/table/basicTable',
    meta: {title: '组件', icon: 'el-component', sort: 20},
    children: [
      {
        path: 'form',
        name: 'Form',
        component: LayoutContent,
        redirect: '/component/form/basicForm',
        meta: {title: '表单', icon: 'el-form'},
        children: [
          {
            path: 'basicForm',
            name: 'BasicForm',
            meta: {title: '基础表单'},
            component: () => import('~/views/demo/component/form/BasicForm.vue'),
          },
          {
            path: 'searchForm',
            name: 'SearchForm',
            meta: {title: '搜索表单'},
            component: () => import('~/views/demo/component/form/SearchForm.vue'),
          },
          {
            path: 'dynamicForm',
            name: 'DynamicForm',
            meta: {title: '动态表单'},
            component: () => import('~/views/demo/component/form/DynamicForm.vue'),
          },
          {
            path: 'ruleForm',
            name: 'RuleForm',
            meta: {title: '表单验证'},
            component: () => import('~/views/demo/component/form/RuleForm.vue'),
          },
          {
            path: 'customForm',
            name: 'CustomForm',
            meta: {title: '自定义组件'},
            component: () => import('~/views/demo/component/form/CustomForm.vue'),
          },
        ],
      },
      {
        path: 'table',
        name: 'Table',
        redirect: '/component/table/basicTable',
        meta: {title: '表格', icon: 'el-table'},
        component: LayoutContent,
        children: [
          {
            path: 'basicTable',
            name: 'BasicTable',
            meta: {title: '基础表格'},
            component: () => import('~/views/demo/component/table/BasicTable.vue'),
          },
          {
            path: 'treeTable',
            name: 'TreeTable',
            meta: {title: '树形表格'},
            component: () => import('~/views/demo/component/table/TreeTable.vue'),
          },
          {
            path: 'queryTable',
            name: 'QueryTable',
            meta: {title: '查询表格'},
            component: () => import('~/views/demo/component/table/QueryTable.vue'),
          },
          {
            path: 'customTable',
            name: 'CustomTable',
            meta: {title: '自定义列'},
            component: () => import('~/views/demo/component/table/CustomTable.vue'),
          },
        ],
      },
      {
        path: 'editor',
        name: 'Editor',
        component: LayoutContent,
        redirect: '/component/editor/code',
        meta: {title: '编辑器', icon: 'el-edit-square'},
        children: [
          {
            path: 'code',
            name: 'Code',
            meta: {title: '代码编辑器'},
            component: () => import('~/views/demo/component/editor/codeEditor.vue'),
          },
          {
            path: 'markdown',
            name: 'Markdown',
            meta: {title: 'markdown编辑器'},
            component: () => import('~/views/demo/component/editor/markdownEditor.vue'),
          },
          {
            path: 'rich',
            name: 'Rich',
            meta: {title: '富文本编辑器'},
            component: () => import('~/views/demo/component/editor/richEditor.vue'),
          },
        ],
      },
      {
        path: 'charts',
        name: 'Charts',
        component: LayoutContent,
        redirect: '/component/echarts/bar',
        meta: {title: '图表', icon: 'el-piechart'},
        children: [
          {
            path: 'bar',
            name: 'Bar',
            meta: {title: '柱状图'},
            component: () => import('~/views/demo/component/echarts/bar.vue'),
          },
          {
            path: 'line',
            name: 'Line',
            meta: {title: '折线图'},
            component: () => import('~/views/demo/component/echarts/line.vue'),
          },
          {
            path: 'pie',
            name: 'Pie',
            meta: {title: '饼图'},
            component: () => import('~/views/demo/component/echarts/pie.vue'),
          }
        ]
      },
      {
        path: 'icon',
        name: 'Icon',
        redirect: '/component/icon/iconfont',
        meta: {title: '图标', icon: 'el-icon-test'},
        component: LayoutContent,
        children: [
          {
            path: 'icon-basic',
            name: 'IconBasic',
            meta: {title: '基本使用'},
            component: () => import('~/views/demo/component/icon/index.vue'),
          },
          {
            path: 'icon-preview',
            name: 'IconPreview',
            meta: {title: '图标预览'},
            component: () => import('~/views/demo/component/icon/preview.vue'),
          },
        ]
      },
      {
        path: 'page-wrapper',
        name: 'PageWrapper',
        meta: {title: '页面包裹'},
        component: () => import('~/views/demo/component/page-wrapper/index.vue'),
      },
    ]
  }
];

export default componentRoute;