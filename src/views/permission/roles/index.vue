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
    <el-table :data="lists" v-loading="loading.lists">
      <el-table-column property="id" label="ID" width="100"/>
      <el-table-column property="label" label="角色名称" show-overflow-tooltip/>
      <el-table-column property="name" label="英文标识" show-overflow-tooltip/>
      <el-table-column label="状态">
        <template #default="{row:{status,status_label}}">
          <el-tag :type="status ? 'success' : 'danger'">{{ status_label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="created_at" label="创建时间" show-overflow-tooltip/>
      <el-table-column property="roles" label="操作" width="120">
        <template #default="{row:{id}}">
          <el-button size="small" type="primary" :icon="Edit" @click="editItem({id})"/>
          <el-popconfirm title="确认要删除吗？" iconColor="red" @confirm="deleteItem({id})">
            <template #reference>
              <el-button size="small" type="danger" :icon="Delete" :loading="loading.delete"/>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt-3" v-bind="paginate" hide-on-single-page @current-change="changePage"></el-pagination>
    <EditTemplate/>
  </PageWrapper>
</template>
<script setup lang="ts" name="PermissionRoles">
import {PageWrapper, FormQuery} from "~/components"
import EditTemplate from "./EditTemplate.vue";
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'
import {useFetchRoleResources} from "~/api/role";
import {onMounted, provide} from "vue";

const querySchemas = [
  {field: 'id', label: '角色ID', placeholder: '请输入角色ID', component: 'Input'},
  {field: 'label', label: '角色名称', placeholder: '请输入角色名称', component: 'Input'},
  {field: 'name', label: '角色标识', placeholder: '请输入角色标识', component: 'Input'},
];

const useResources = useFetchRoleResources();
const {params, dialog, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;
onMounted(() => console.log('roles'))
provide('useResources', useResources);
</script>