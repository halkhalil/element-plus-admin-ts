<template>
  <PageWrapper>
    <template #header>
      <FormQuery v-model="params"
                 :schemas="querySchemas"
                 label-width="50px"
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
import {provide, watch} from "vue";
import {useFetchUserResources} from '~/api/user'
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'
import {useUrlSearchParams} from "@vueuse/core";
import {useTab} from "~/layouts/common/tab/useTab";

const tableColumns = [
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'email', label: '邮箱', minWidth: 240},
  {prop: 'realname', label: '姓名', minWidth: 100},
  {prop: 'nickname', label: '昵称', minWidth: 160},
  {prop: 'roles', label: '角色', minWidth: 150, formatter: ({roles}) => roles.map(role => role.label).join(',')},
  {slot: 'status', label: '状态', width: 80},
  {prop: 'created_at', label: '创建时间', width: 140},
  {slot: 'actions', label: '操作', width: 130},
];
const querySchemas = [
  {field: 'id', label: '标识', placeholder: '请输入用户唯一表示', component: 'Input'},
  {field: 'email', label: '邮箱', placeholder: '请输入邮箱', component: 'Input'},
  {field: 'realname', label: '姓名', placeholder: '请输入昵称', component: 'Input'},
];

const useResources = useFetchUserResources({params: useUrlSearchParams()});
const {params, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

const {updateCurrentTab} = useTab();
watch(params, () => updateCurrentTab({query: params}));

provide('useResources', useResources);
</script>

