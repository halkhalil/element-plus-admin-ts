<template>
  <page-wrapper :title="$route?.meta?.title">
    <template #extra>
      <el-button type="primary" @click="addItem">新增</el-button>
    </template>
    <BasicForm v-model="query" :schemas="querySchemas" :colProps="{xs: 24, sm: 12, md: 12, lg: 8, xl: 6}" @submit="submit"></BasicForm>
    <basic-table :columns="tableColumns"
                 :data="lists"
                 :paginate="paginate"
                 :loading="loading.list"
                 :border="true"
                 @change-page="changePage">
      <template #roles="{row:{roles}}">
        <el-tag class="mr-2" v-for="(item,index) in roles" :key="index">{{ item.label }}</el-tag>
      </template>
      <template #actions="{row}">
        <el-button type="primary" text @click="editItem(row)">编辑</el-button>
        <el-popconfirm title="删除你是认真的吗？" iconColor="red" @confirm="deleteItem(row)">
          <template #reference>
            <el-button type="danger" text :loading="loading.delete">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </basic-table>
    <EditTemplate v-model="dialog"/>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page"
import {BasicTable, BasicQuery} from "~/components/Table"
import {BasicForm} from "~/components/Form";
import EditTemplate from "./EditTemplate.vue";
import {provide} from "vue";
import {useFetchResource} from "~/api/user";

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

const useResources = useFetchResource();
const {dialog, query, loading, lists, paginate, addItem, editItem, deleteItem, getQuery, changePage} = useResources;

const submit = () => {
  console.log(111);
}

provide('useResources', useResources)
</script>

