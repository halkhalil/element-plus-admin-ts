<template>
  <page-wrapper :title="$route.meta['title']">
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
    <basic-table row-key="id" lazy
                 :columns="tableColumns"
                 :data="lists"
                 :paginate="paginate"
                 :loading="loading.lists"
                 :border="true"
                 ref="tableRef"
                 :tree-props="{children: 'children', hasChildren: 'children_count'}"
                 @change-page="changePage">
      <template #label="{row:{icon,label}}">
        <div class="flex-row align-center">
          <span style="width: 14px;"><icon v-if="icon" :name="icon" :size="14"/></span>
          <span class="ml-1">{{ label }}</span>
        </div>
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
import {BasicTable,} from "~/components/Table"
import {QueryForm} from "~/components/Form";
import EditTemplate from "./EditTemplate.vue";
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'
import {provide, shallowRef, watch} from "vue";
import {useFetchMenuResources} from "~/api/menu";
import {RoleItem} from "~/api/role/RoleModel";

const tableColumns = shallowRef([
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'label', label: '菜单名称', minWidth: 120, slot: 'label'},
  {prop: 'name', label: '英文标识', minWidth: 120},
  {prop: 'type_label', label: '菜单类型', minWidth: 80},
  {prop: 'path', label: '目标地址', minWidth: 150},
  {prop: 'created_at', label: '创建时间', minWidth: 135},
  {prop: 'action', label: '操作', minWidth: 65, slot: 'actions'},
]);

const querySchemas = shallowRef([
  {field: 'id', placeholder: '菜单ID', component: 'Input'},
  {field: 'title', placeholder: '菜单名称', component: 'Input'},
  {field: 'name', placeholder: '菜单标识', component: 'Input'},
])

const useResources = useFetchMenuResources();
const {params, dialog, lists, paginate, loading, addItem, editItem, deleteItem, handleQuery, changePage} = useResources;

provide('useResources', useResources);
</script>

