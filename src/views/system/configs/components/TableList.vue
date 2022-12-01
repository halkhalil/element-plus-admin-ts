<template>
  <PageWrapper content-full-height>
    <template #header>
      <FormQuery v-model="params"
                 :schemas="querySchemas"
                 :colProps="{xs: 24, sm: 12, md: 12, lg: 8, xl: 6}"
                 show-label
                 label-width="50px"
                 @submit="handleQuery">
        <template #extra>
          <el-button type="success" :icon="Plus" @click="addItem"></el-button>
          <el-button type="warning" :icon="Refresh" @click="handleQuery" :loading="loading.lists"></el-button>
        </template>
      </FormQuery>
    </template>
    <el-table :data="lists" v-loading="loading.lists">
      <el-table-column property="id" label="ID" width="100"/>
      <el-table-column property="name" label="唯一标识" show-overflow-tooltip/>
      <el-table-column property="label" label="显示名称" show-overflow-tooltip/>
      <el-table-column property="group_label" label="所属分组" show-overflow-tooltip/>
      <el-table-column property="type_label" label="配置类型" show-overflow-tooltip/>
      <el-table-column property="component" label="渲染组件" show-overflow-tooltip/>
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
    <edit-template/>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper, FormQuery} from "~/components"
import EditTemplate from "./EditTemplate.vue";
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'
import {useFetchConfigResources} from "~/api/config";
import {provide} from "vue";

const querySchemas = [
  {field: 'id', label: 'ID', placeholder: '请输入动作ID', component: 'Input'},
  {field: 'name', label: '标识', placeholder: '请输入动作标识', component: 'Input'},
  {field: 'label', label: '名称', placeholder: '请输入动作名称', component: 'Input'},
];

const useResources = useFetchConfigResources();
const {params, dialog, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

provide('useResources', useResources);
</script>