<template>
  <PageWrapper content-full-height>
    <template #header>
      <FormQuery v-model="params"
                 :schemas="querySchemas"
                 label-width="70px"
                 @submit="handleQuery">
        <template #extra>
          <el-button type="success" :icon="Plus" @click="addItem"></el-button>
          <el-button type="warning" :icon="Refresh" @click="handleQuery" :loading="loading.lists"></el-button>
        </template>
      </FormQuery>
    </template>
    <Table :columns="tableColumns"
           :data="lists"
           :paginate="paginate"
           :loading="loading.lists"
           :border="true"
           ref="tableRef"
           @change-page="changePage">
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
    </Table>
    <edit-template/>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper, FormQuery, Table} from "~/components"
import EditTemplate from "./EditTemplate.vue";
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'
import {useFetchRoleResources} from "~/api/role";
import {provide} from "vue";

const tableColumns = [
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'label', label: '角色名称', minWidth: 150},
  {prop: 'name', label: '角色标识', minWidth: 150},
  {prop: 'status_label', label: '状态', minWidth: 100, slot: 'status'},
  {prop: 'updated_at', label: '修改时间', minWidth: 160},
  {prop: 'created_at', label: '创建时间', minWidth: 160},
  {prop: 'action', label: '操作', width: 130, slot: 'actions'},
];
const querySchemas = [
  {field: 'id', label: '角色ID', placeholder: '请输入角色ID', component: 'Input'},
  {field: 'label', label: '角色名称', placeholder: '请输入角色名称', component: 'Input'},
  {field: 'name', label: '角色标识', placeholder: '请输入角色标识', component: 'Input'},
];

const useResources = useFetchRoleResources();
const {params, dialog, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

provide('useResources', useResources);
</script>