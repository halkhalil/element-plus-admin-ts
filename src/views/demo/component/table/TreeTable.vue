<template>
  <PageWrapper
    :title="$route['meta']['title']"
    :sub-title="$route['meta']['title']"
    content-background>
    <el-card shadow="none">
      <BasicTable :data="tableData" :columns="tableColumns" border row-key="id">
        <template #action>
          <el-button type="text">编辑</el-button>
          <el-button type="text" style="color: red">删除</el-button>
        </template>
      </BasicTable>
    </el-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {BasicTable} from "~/components/Table";
import {PageWrapper} from '~/components/Page';
import {getBasicColumns, getTreeData} from './data';
import {reactive} from "vue";

const tableColumns = reactive(getBasicColumns());
const tableData = reactive(getTreeData());
</script>
