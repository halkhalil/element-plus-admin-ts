<template>
  <page-wrapper
    :title="$route['meta']['title']"
    :sub-title="$route['meta']['title']"
    content-background>
    <ba-table :data="tableData" :columns="tableColumns" :border="true" row-key="id">
      <template #action>
        <el-button type="text">编辑</el-button>
        <el-button type="text" style="color: red">删除</el-button>
      </template>
    </ba-table>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {BaTable} from "~/components/Table";
import {PageWrapper} from '~/components/Page';
import {getBasicColumns, getTreeData} from './data';
import {reactive} from "vue";

const tableColumns = reactive(getBasicColumns());
const tableData = reactive(getTreeData());
</script>
