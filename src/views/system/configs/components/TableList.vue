<template>
  <page-wrapper content-full-height>
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
    <basic-table :columns="tableColumns"
                 :data="lists"
                 :paginate="paginate"
                 :loading="loading.lists"
                 :border="true"
                 ref="tableRef"
                 @change-page="changePage">
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
import {BasicTable} from "~/components/Table"
import {QueryForm} from "~/components/Form";
import EditTemplate from "./EditTemplate.vue";
import {provide} from "vue";
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'
import {useFetchConfigResources} from "~/api/config";

const tableColumns = [
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'label', label: '显示名称', minWidth: 100},
  {prop: 'name', label: '唯一标识', minWidth: 100},
  {prop: 'group_label', label: '分组', minWidth: 100},
  {prop: 'type_label', label: '类型', minWidth: 100},
  {prop: 'component', label: '渲染组件', minWidth: 100},
  {prop: 'created_at', label: '创建时间', width: 160},
  {slot: 'actions', label: '操作', width: 130},
];
const querySchemas = [
  {field: 'id', label: 'ID', placeholder: '请输入动作ID', component: 'Input'},
  {field: 'name', label: '标识', placeholder: '请输入动作标识', component: 'Input'},
  {field: 'label', label: '名称', placeholder: '请输入动作名称', component: 'Input'},
];

const useResources = useFetchConfigResources();
const {params, dialog, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

provide('useResources', useResources);
</script>