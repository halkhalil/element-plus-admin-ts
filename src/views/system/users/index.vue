<template>
  <page-wrapper :title="$route?.meta?.title">
    <template #extra>
      <el-button type="primary" @click="addItem">新增</el-button>
    </template>
    <basic-form v-model="query"
                :schemas="querySchemas"
                :colProps="{xs: 24, sm: 12, md: 12, lg: 8, xl: 6}"
                @submit="submit"
                @reset="reset"></basic-form>
    <basic-table :columns="tableColumns"
                 :data="getLists"
                 :paginate="getPaginate"
                 :loading="!listsReturn.loading"
                 :border="true"
                 @change-page="changePage">
      <template #roles="{row:{roles}}">
        <el-tag class="mr-2"
                v-for="(item,index) in roles"
                :key="index">{{ item.label }}</el-tag>
      </template>
      <template #actions="{row:{id}}">
        <el-button type="primary" text @click="editItem({id})">编辑</el-button>
        <el-popconfirm title="确认要删除吗？" iconColor="red" @confirm="deleteItem({id})">
          <template #reference>
            <el-button type="danger" text :loading="!deleteReturn.loading">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </basic-table>
    <edit-template/>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page"
import {BasicTable, BasicQuery} from "~/components/Table"
import {BasicForm} from "~/components/Form";
import EditTemplate from "./EditTemplate.vue";
import {provide, reactive, ref} from "vue";
import {useApiResources} from "~/composables/useApiResources";
import {useRouter} from "vue-router";
import {
  useFetchLists,
  useFetchItem,
  useFetchStore,
  useFetchUpdate,
  useFetchDelete,
  useFetchUserApiResource, useFetchUserResources
} from '~/api/user'
import {useUrlSearchParams} from "@vueuse/core";

const tableColumns = [
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'username', label: '用户名', minWidth: 100},
  {prop: 'nickname', label: '昵称', minWidth: 100},
  {prop: 'roles', label: '角色', minWidth: 100, slot: 'roles'},
  {prop: 'status_label', label: '状态', minWidth: 100},
  {prop: 'created_at', label: '创建时间', minWidth: 100},
  {prop: 'action', label: '操作', minWidth: 100, slot: 'actions'},
];
const querySchemas = [
  {field: 'id', placeholder: '用户ID', component: 'Input'},
  {field: 'username', placeholder: '用户名', component: 'Input'},
  {field: 'nickname', placeholder: '昵称', component: 'Input'},
];
const query = useUrlSearchParams();
console.log('query', query);
const item = reactive({})
const useResources = useFetchUserResources();
const {
  listsReturn,
  deleteReturn,
  getLists,
  getPaginate,
  addItem,
  editItem,
  deleteItem,
  getQuery,
  changePage
} = useResources;

const {currentRoute, replace, push} = useRouter()
console.log(currentRoute)
const submit = () => {
  console.log(111);
  push({path: '/system/users', query})
}
const reset = () => {
  for (let key in query) {
    delete query[key]
  }
}
provide('useResources', useResources)
</script>

