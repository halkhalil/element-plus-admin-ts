<template>
  <page-wrapper
    :title="$route['meta']['title']"
    sub-title="el-table的所有属性都可以直接使用"
    content-background>
    <template #extra>
      <el-button type="default">操作1</el-button>
      <el-button type="primary">操作2</el-button>
    </template>
    <BasicTable :data="tableData" :columns="tableColumns" :border="true" class="m-1">
      <template #action>
        <el-button type="text">编辑</el-button>
        <el-button type="text" style="color: red">删除</el-button>
      </template>
    </BasicTable>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {BasicTable} from "~/components/Table";
import {PageWrapper} from '~/components/Page';

import {getBasicColumns, getBasicData} from './data';
import {reactive} from "vue";

const tableColumns = reactive(getBasicColumns());
const tableData = reactive(getBasicData());
</script>
