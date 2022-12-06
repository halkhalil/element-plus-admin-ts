<template>
  {{ $options }}
  <PageWrapper content-full-height>
    <template #header>
      <FormQuery v-model="query"
                 :schemas="querySchemas"
                 :advanced="query.advanced"
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
      <el-table-column property="email" label="邮箱" show-overflow-tooltip/>
      <el-table-column property="realname" label="姓名" show-overflow-tooltip/>
      <el-table-column property="nickname" label="昵称" show-overflow-tooltip/>
      <el-table-column label="角色" show-overflow-tooltip>
        <template #default="{row:{roles}}">{{ roles.map(role => role.label).join(',') }}</template>
      </el-table-column>
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

<script setup lang="ts" name="users">
import {PageWrapper, FormQuery} from "~/components"
import EditTemplate from "./EditTemplate.vue";
import {provide} from "vue";
import {useFetchUserResources} from '~/api/user'
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'

const querySchemas = [
  {field: 'id', label: '标识', placeholder: '请输入用户唯一表示', component: 'Input'},
  {field: 'email', label: '邮箱', placeholder: '请输入邮箱', component: 'Input'},
  {field: 'realname', label: '姓名', placeholder: '请输入昵称', component: 'Input'},
];

const useResources = useFetchUserResources();
const {query, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

provide('useResources', useResources);
</script>

