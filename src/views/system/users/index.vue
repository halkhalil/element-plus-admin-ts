<template>
  <page-wrapper>
    <template #page-header>
      <query-form v-model="params"
                  :schemas="querySchemas"
                  :colProps="{xs: 24, sm: 12, md: 12, lg: 8, xl: 6}"
                  show-label
                  label-width="50px"
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
import {BasicTable} from "~/components/Table"
import {QueryForm} from "~/components/Form";
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
  {prop: 'status', label: '状态', minWidth: 100, slot: 'status'},
  {prop: 'created_at', label: '创建时间', minWidth: 150},
  {prop: 'action', label: '操作', minWidth: 130, slot: 'actions'},
];
const querySchemas = [
  {field: 'id', label: '标识', placeholder: '请输入用户唯一表示', component: 'Input'},
  {field: 'email', label: '邮箱', placeholder: '请输入邮箱', component: 'Input'},
  {field: 'realname', label: '姓名', placeholder: '请输入昵称', component: 'Input'},
];

const useResources = useFetchUserResources({params: useUrlSearchParams()});
const {params, lists, paginate, dialog, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

const {updateCurrentTab} = useTab();
watch(params, () => updateCurrentTab({query: params}));

provide('useResources', useResources);
</script>

