<template>
  <page-wrapper :title="$route?.meta?.title">
    <template #page-header>

      <query-form>
        <template #extra>
          <el-button type="default" :icon="Plus" @click="addItem">添加</el-button>
          <el-button type="primary" :icon="Edit" @click="addItem">编辑</el-button>
          <el-button type="danger" :icon="Delete" @click="addItem">删除</el-button>
          <el-button type="warning" :icon="Refresh" @click="handleQuery">刷新</el-button>
        </template>
      </query-form>
    </template>

    <!--    <basic-form v-model="params"-->
    <!--                :schemas="querySchemas"-->
    <!--                :colProps="{xs: 24, sm: 12, md: 12, lg: 8, xl: 6}"-->
    <!--                @submit="handleQuery"></basic-form>-->
    {{multipleSelection}}
    <basic-table :columns="tableColumns"
                 :data="lists"
                 :paginate="paginate"
                 :loading="loading.lists"
                 :border="true"
                 @selection-change="handleSelectionChange"
                 @change-page="changePage">
      <template #roles="{row:{roles}}">
        <el-tag class="mr-2" v-for="(item,index) in roles" :key="index">{{ item.label }}</el-tag>
      </template>
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
import {BasicForm, QueryForm} from "~/components/Form";
import EditTemplate from "./EditTemplate.vue";
import {provide, ref} from "vue";
import {useFetchUserResources} from '~/api/user'
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'

const tableColumns = [
  {type: 'selection', width: 40},
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'username', label: '用户名', minWidth: 100},
  {prop: 'nickname', label: '昵称', minWidth: 100},
  {prop: 'roles', label: '角色', minWidth: 100, slot: 'roles'},
  {prop: 'status_label', label: '状态', minWidth: 100},
  {prop: 'created_at', label: '创建时间', minWidth: 100},
  {prop: 'action', label: '操作', minWidth: 45, slot: 'actions'},
];
const querySchemas = [
  {field: 'id', placeholder: '用户ID', component: 'Input'},
  {field: 'username', placeholder: '用户名', component: 'Input'},
  {field: 'nickname', placeholder: '昵称', component: 'Input'},
];

const multipleSelection = ref([])
const handleSelectionChange = (val:[]) => {
  console.log(val)
  multipleSelection.value = val.map(item=>item.id)
}

const useResources = useFetchUserResources();
provide('useResources', useResources);
const {params, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;
</script>

