<template>
  <PageWrapper
    :title="$route['meta']['title']"
    :sub-title="$route['meta']['title']">
    <el-card shadow="none">
      <BasicForm v-model="formModel"
                 :schemas="formSchemas"
                 :label-width="100"
                 :action-props="{showAdvancedButton:true}"
                 :col-props="{span:6}"
                 @submit="handleSearch"></BasicForm>
    </el-card>
    <el-card shadow="none" class="mt-2">
      <BasicTable :data="tableData" :columns="tableColumns" border>
        <template #action="{row,$index}">
          <el-button type="text" @click="handleEdit(row,$index)">编辑</el-button>
          <el-button type="text" style="color: red" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </BasicTable>
    </el-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page';
import {BasicTable} from "~/components/Table";
import {BasicForm} from "~/components/Form";
import {getBasicColumns, getBasicData} from './data';
import {getSearchFormData} from './../form/data';
import {reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const tableColumns = reactive(getBasicColumns())
const tableData = reactive(getBasicData())
const formSchemas = reactive(getSearchFormData())
const formModel = reactive({});

const handleEdit = (row, index) => console.log(index, row);
const handleDelete = (row, index) => {
  ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    tableData.splice(index, 1);
    ElMessage.success('删除成功!')
  }).catch(() => {
    ElMessage.info('已取消删除!')
  });
}

const handleSearch = () => {
  console.log(formModel);
}
</script>
