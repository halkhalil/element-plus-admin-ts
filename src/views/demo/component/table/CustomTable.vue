<template>
  <page-wrapper
    :title="$route['meta']['title']"
    :sub-title="$route['meta']['title']">
    <basic-table :data="tableData" :columns="tableColumns" :border="true">
      <template #name="{row,$index}">
        <el-button type="text">{{ row.name }}</el-button>
      </template>
      <template #action="{row,$index}">
        <el-button type="text" @click="handleEdit(row,$index)">编辑</el-button>
        <el-popconfirm title="确定要删除吗?">
          <template #reference>
            <el-button type="text" style="color: red" @click="handleDelete(row,$index)">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </basic-table>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {BasicTable} from "~/components/Table";
import {PageWrapper} from '~/components/Page';
import {getCustomColumns, getBasicData} from './data';
import {reactive} from "vue";

const tableColumns = reactive(getCustomColumns())
const tableData = reactive(getBasicData())

const handleEdit = (row, index) => console.log(index, row);
const handleDelete = (row, index) => console.log(index, row);
</script>