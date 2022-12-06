import {LAYOUT, CONTENT} from "~/router/constant";
import {AppRouteRecordRaw} from "~/router/types";
import {$t} from "~/locales";

const componentRoute: AppRouteRecordRaw[] = [
  {
    path: '/component',
    name: 'Component',
    component: LAYOUT,
    redirect: '/component/table/basicTable',
    meta: {title: $t('routes.demo.component'), icon: 'ep:coin', sort: 80},
    children: [
      {
        path: 'form',
        name: 'Form',
        component: CONTENT,
        redirect: '/component/form/basicForm',
        meta: {title: $t('routes.demo.form.form'), icon: 'fluent:form-28-regular'},
        children: [
          {
            path: 'basicForm',
            name: 'BasicForm',
            meta: {title: $t('routes.demo.form.basic')},
            component: () => import('~/views/demo/component/form/BasicForm.vue'),
          },
          {
            path: 'searchForm',
            name: 'SearchForm',
            meta: {title: $t('routes.demo.form.search')},
            component: () => import('~/views/demo/component/form/SearchForm.vue'),
          },
          {
            path: 'dynamicForm',
            name: 'DynamicForm',
            meta: {title: $t('routes.demo.form.dynamic')},
            component: () => import('~/views/demo/component/form/DynamicForm.vue'),
          },
          {
            path: 'ruleForm',
            name: 'RuleForm',
            meta: {title: $t('routes.demo.form.rule')},
            component: () => import('~/views/demo/component/form/RuleForm.vue'),
          },
          {
            path: 'customForm',
            name: 'CustomForm',
            meta: {title: $t('routes.demo.form.custom')},
            component: () => import('~/views/demo/component/form/CustomForm.vue'),
          },
        ],
      },
      {
        path: 'table',
        name: 'Table',
        redirect: '/component/table/basicTable',
        meta: {title: $t('routes.demo.table.table'), icon: 'ant-design:table-outlined'},
        component: CONTENT,
        children: [
          {
            path: 'basicTable',
            name: 'BaTable',
            meta: {title: $t('routes.demo.table.basic')},
            component: () => import('~/views/demo/component/table/BasicTable.vue'),
          },
          {
            path: 'treeTable',
            name: 'TreeTable',
            meta: {title: $t('routes.demo.table.tree')},
            component: () => import('~/views/demo/component/table/TreeTable.vue'),
          },
          {
            path: 'queryTable',
            name: 'QueryTable',
            meta: {title: $t('routes.demo.table.query')},
            component: () => import('~/views/demo/component/table/QueryTable.vue'),
          },
          {
            path: 'customTable',
            name: 'CustomTable',
            meta: {title: $t('routes.demo.table.custom')},
            component: () => import('~/views/demo/component/table/CustomTable.vue'),
          },
        ],
      },
      {
        path: 'editor',
        name: 'Editor',
        component: CONTENT,
        redirect: '/component/editor/code',
        meta: {title: $t('routes.demo.editor.editor'), icon: 'ep:edit-pen'},
        children: [
          {
            path: 'code',
            name: 'Code',
            meta: {title: $t('routes.demo.editor.code')},
            component: () => import('~/views/demo/component/editor/codeEditor.vue'),
          },
          {
            path: 'markdown',
            name: 'Markdown',
            meta: {title: $t('routes.demo.editor.markdown')},
            component: () => import('~/views/demo/component/editor/markdownEditor.vue'),
          },
          {
            path: 'rich',
            name: 'Rich',
            meta: {title: $t('routes.demo.editor.rich')},
            component: () => import('~/views/demo/component/editor/richEditor.vue'),
          },
        ],
      },
      {
        path: 'charts',
        name: 'Charts',
        component: CONTENT,
        redirect: '/component/echarts/bar',
        meta: {title: $t('routes.demo.charts.charts'), icon: 'akar-icons:map'},
        children: [
          {
            path: 'bar',
            name: 'Bar',
            meta: {title: $t('routes.demo.charts.bar')},
            component: () => import('~/views/demo/component/echarts/bar.vue'),
          },
          {
            path: 'line',
            name: 'Line',
            meta: {title: $t('routes.demo.charts.line')},
            component: () => import('~/views/demo/component/echarts/line.vue'),
          },
          {
            path: 'pie',
            name: 'Pie',
            meta: {title: $t('routes.demo.charts.pie')},
            component: () => import('~/views/demo/component/echarts/pie.vue'),
          }
        ]
      },
      {
        path: 'icon',
        name: 'Icon',
        redirect: '/component/icon/iconfont',
        meta: {title: $t('routes.demo.icon.icon'), icon: 'simple-icons:iconify'},
        component: CONTENT,
        children: [
          {
            path: 'icon-basic',
            name: 'IconBasic',
            meta: {title: $t('routes.demo.icon.basic')},
            component: () => import('~/views/demo/component/icon/index.vue'),
          },
          // {
          //   path: 'icon-preview',
          //   name: 'IconPreview',
          //   meta: {title: $t('routes.demo.icon.preview')},
          //   component: () => import('~/views/demo/component/icon/preview.vue'),
          // },
        ]
      },
      {
        path: 'upload',
        name: 'Upload',
        redirect: '/component/upload/basic-upload',
        meta: {title: $t('routes.demo.upload.upload'), icon: 'ep:upload'},
        component: CONTENT,
        children: [
          {
            path: 'basic-upload',
            name: 'BasicUpload',
            meta: {title: $t('routes.demo.upload.basic')},
            component: () => import('~/views/demo/component/upload/BasicUpload.vue'),
          },
          {
            path: 'oss-upload',
            name: 'OssUpload',
            meta: {title: $t('routes.demo.upload.oss')},
            component: () => import('~/views/demo/component/upload/OssUpload.vue'),
          },
        ]
      },
      {
        path: 'page-wrapper',
        name: 'PageWrapper',
        meta: {title: $t('routes.demo.pageWrapper')},
        component: () => import('~/views/demo/component/page-wrapper/index.vue'),
      },
    ]
  }
];

export default componentRoute;