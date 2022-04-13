<template>
  <PageWrapper :title="$route.meta['title']">
    <template #extra>
      <el-button type="primary" @click="addItem">新增</el-button>
    </template>
    <el-card shadow="none">
      <BasicQuery v-model="query" :schemas="schemas" @submit="getQuery"></BasicQuery>
    </el-card>
    <el-card shadow="none" class="mt-2">
      <BasicTable :columns="columns"
                  :data="lists?.data"
                  :paginate="lists?.meta"
                  :loading="loading"
                  @change-page="changePage">

        <template #roles="{row:{roles}}">
          <el-tag class="mr-2" v-for="(item,index) in roles" :key="index">{{ item.label }}</el-tag>
        </template>
        <el-table-column label="操作" width="120">
          <template #default="{row}">
            <el-button type="text" @click="editItem(row)">编辑</el-button>
            <el-popconfirm title="删除你是认真的吗？" iconColor="red" @confirm="deleteItem(row)">
              <template #reference>
                <el-button type="text" class="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </BasicTable>
      <EditTemplate ref="editTemplateRef" v-model="dialog"/>
    </el-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page"
import {BasicTable, BasicQuery} from "~/components/Table"
import EditTemplate from "./EditTemplate.vue";
import {onMounted, provide} from "vue";
import {useFetchResource} from "~/api/user";

const columns = [
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'username', label: '用户名', minWidth: 100},
  {prop: 'nickname', label: '昵称', minWidth: 100},
  {prop: 'roles', label: '角色', minWidth: 100, slot: 'roles'},
  {prop: 'status_label', label: '状态', minWidth: 100},
  {prop: 'created_at', label: '创建时间', minWidth: 100},
];
const schemas = [
  {field: 'id', placeholder: '用户ID', component: 'Input'},
  {field: 'username', placeholder: '用户名', component: 'Input'},
  {field: 'nickname', placeholder: '昵称', component: 'Input'},
];

const useResource = useFetchResource()
const {useListReturn, changePage, editItem, addItem, deleteItem, getQuery, query, dialog} = useResource;
const {data: lists, loading} = useListReturn;

provide('useResource', useResource);
</script>

