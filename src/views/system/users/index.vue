<template>
  <page-wrapper>
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
                 @change-page="changePage">
      <template #actions="{row:{id}}">
        <el-button type="primary" :icon="Edit" circle @click="editItem({id})"></el-button>
        <el-popconfirm title="确认要删除吗？" iconColor="red" @confirm="deleteItem({id})">
          <template #reference>
            <el-button type="danger" :icon="Delete" circle :loading="loading.delete"></el-button>
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
import {useFetchUserResources} from '~/api/user'
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'

const tableColumns = [
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'username', label: '用户名', minWidth: 100},
  {prop: 'nickname', label: '昵称', minWidth: 100},
  {prop: 'roles', label: '角色', minWidth: 100, formatter: ({roles}) => roles.map(role => role.label).join(',')},
  {prop: 'status_label', label: '状态', minWidth: 100},
  {prop: 'created_at', label: '创建时间', minWidth: 100},
  {prop: 'action', label: '操作', minWidth: 45, slot: 'actions'},
];
const querySchemas = [
  {field: 'id', label: '用户标识', placeholder: '请输入用户唯一表示', component: 'Input'},
  {field: 'username', label: '用户名', placeholder: '请输入用户名', component: 'Input'},
  {field: 'nickname', label: '用户昵称', placeholder: '请输入昵称', component: 'Input'},
];

const useResources = useFetchUserResources();
const {params, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

provide('useResources', useResources);
</script>

