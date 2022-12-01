<template>
  <PageWrapper :title="$route.meta['title']">
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
    <el-table ref="tableRef" row-key="id" lazy
              :data="lists"
              :paginate="paginate"
              :loading="loading.lists"
              :border="true"
              :tree-props="{children: 'children', hasChildren: 'children_count'}">
      <el-table-column property="id" label="ID" width="100"/>
      <el-table-column property="label" label="菜单名称" show-overflow-tooltip/>
      <el-table-column property="type_label" label="菜单类型" show-overflow-tooltip/>
      <el-table-column property="rule_label" label="规则类型" show-overflow-tooltip/>
      <el-table-column property="name" label="菜单标识" show-overflow-tooltip/>
      <el-table-column property="path" label="路由地址" show-overflow-tooltip/>
      <el-table-column property="component" label="路由组件" show-overflow-tooltip/>
      <el-table-column label="状态" width="80">
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

<script lang="ts" setup>
import {PageWrapper, FormQuery} from "~/components"
import EditTemplate from "./EditTemplate.vue";
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'
import {provide, shallowRef} from "vue";
import {useFetchMenuResources} from "~/api/menu";

const querySchemas = shallowRef([
  {field: 'id', label: '菜单ID', placeholder: '菜单ID', component: 'Input'},
  {field: 'title', label: '菜单名称', placeholder: '菜单名称', component: 'Input'},
  {field: 'name', label: '菜单标识', placeholder: '菜单标识', component: 'Input'},
])

const useResources = useFetchMenuResources();
const {params, dialog, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

provide('useResources', useResources);
</script>

