<template>
  <page-wrapper :title="$route.meta['title']">
    <template #page-header>
      <query-form v-model="params"
                  :schemas="querySchemas"
                  :colProps="{xs: 24, sm: 12, md: 12, lg: 8, xl: 6}"
                  show-label
                  label-width="100px"
                  @submit="handleQuery">
        <template #extra>
          <el-button type="success" :icon="Plus" @click="addItem"></el-button>
          <el-button type="warning" :icon="Refresh" @click="handleQuery" :loading="loading.lists"></el-button>
        </template>
      </query-form>
    </template>
    <basic-table row-key="id" lazy
                 :columns="tableColumns"
                 :data="lists"
                 :paginate="paginate"
                 :loading="loading.lists"
                 :border="true"
                 ref="tableRef"
                 :tree-props="{children: 'children', hasChildren: 'children_count'}"
                 @change-page="changePage">
      <template #label="{row:{icon,label}}">
        <div class="flex flex-row">
          <div class="flex flex-col justify-center">
            <icon v-if="icon" :icon="icon" :size="14"/>
          </div>
          <div class="ml-1">{{ label }}</div>
        </div>
      </template>
      <template #status="{row:{status,status_label}}">
        <el-tag :type="status ? 'success' : 'danger'">{{ status_label }}</el-tag>
      </template>
      <template #actions="{row:{id}}">
        <el-button type="primary" :icon="Edit" @click="editItem({id})"></el-button>
        <el-popconfirm title="确认要删除吗？" iconColor="red" @confirm="deleteItem({id})">
          <template #reference>
            <el-button type="danger" :icon="Delete" :loading="loading.delete"></el-button>
          </template>
        </el-popconfirm>
      </template>
    </basic-table>
    <edit-template/>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page"
import {BasicTable,} from "~/components/Table"
import {QueryForm} from "~/components/Form";
import EditTemplate from "./EditTemplate.vue";
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'
import {provide, shallowRef} from "vue";
import {useFetchMenuResources} from "~/api/menu";

const tableColumns = shallowRef([
  {prop: 'id', label: 'ID', width: 80},
  {slot: 'label', label: '菜单名称', width: 120},
  {prop: 'type_label', label: '菜单类型', width: 85, align: 'center'},
  {prop: 'rule_label', label: '规则类型', width: 85, align: 'center'},
  {prop: 'name', label: '菜单标识', minWidth: 150},
  {prop: 'path', label: '路由地址', minWidth: 180},
  {prop: 'component', label: '路由组件', minWidth: 180},
  {slot: 'status', label: '状态', width: 70, align: 'center'},
  {prop: 'created_at', label: '创建时间', width: 150},
  {slot: 'actions', label: '操作', width: 130},
]);

const querySchemas = shallowRef([
  {field: 'id', placeholder: '菜单ID', component: 'Input'},
  {field: 'title', placeholder: '菜单名称', component: 'Input'},
  {field: 'name', placeholder: '菜单标识', component: 'Input'},
])

const useResources = useFetchMenuResources();
const {params, dialog, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

provide('useResources', useResources);
</script>

