<template>
  <PageWrapper :title="$route.meta?.title" content-full-height>
    <div class="mb-2">
      <el-divider content-position="left">表单选项</el-divider>
      <el-form v-model="formProps" label-width="100px" inline>
        <el-form-item label="label显示">
          <el-switch v-model="formProps.showLabel"></el-switch>
        </el-form-item>
        <el-form-item label="label宽度">
          <el-input-number v-model="formProps.labelWidth" :disabled="!formProps.showLabel"></el-input-number>
        </el-form-item>
        <el-form-item label="label位置">
          <el-radio-group v-model="formProps.labelPosition" :disabled="!formProps.showLabel">
            <el-radio-button label="left"/>
            <el-radio-button label="right"/>
            <el-radio-button label="top"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="表单大小">
          <el-radio-group v-model="formProps.size">
            <el-radio-button label="large"/>
            <el-radio-button label="default"/>
            <el-radio-button label="small"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="按钮位置">
          <el-radio-group v-model="formProps.action.position">
            <el-radio-button label="left"/>
            <el-radio-button label="center"/>
            <el-radio-button label="right"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="按钮单独一行">
          <el-switch v-model="formProps.action.singleLine"></el-switch>
        </el-form-item>
        <el-form-item label="表单宽度铺满">
          <el-switch v-model="formProps.widthFull"></el-switch>
        </el-form-item>
        <el-form-item label="每行展示个数">
          <el-select v-model="formProps.colProps" value-key="xl">
            <el-option :value="{xs: 24, sm: 12, md: 12, lg: 8, xl: 12}" :label="2"></el-option>
            <el-option :value="{xs: 24, sm: 12, md: 12, lg: 8, xl: 8}" :label="3"></el-option>
            <el-option :value="{xs: 24, sm: 12, md: 12, lg: 8, xl: 6}" :label="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-divider content-position="left">表单预览</el-divider>
    <div class="p-5">
      <Form v-model="searchForm"
            :schemas="formSchema"
            v-bind="formProps"
      ></Form>
    </div>

    <div class="p-5">
      <el-divider content-position="left" class="mt-5">基于BaForm二次封装的搜索表单</el-divider>
      <FormQuery v-model="params"
                 :schemas="formSchema"
                 :advanced="true"
                 label-width="100px"
                 @submit="submit">
        <template #extra>
          <el-button type="success" :icon="Plus">添加</el-button>
          <el-button type="primary" :icon="Edit">编辑</el-button>
          <el-button type="danger" :icon="Delete">删除</el-button>
          <el-button type="warning" :icon="Refresh">刷新</el-button>
        </template>
      </FormQuery>

      <el-divider content-position="left" class="mt-5">只显示按钮</el-divider>
      <FormQuery v-model="params"
                 :schemas="formSchema"
                 simple
                 :advanced="true"
                 label-width="100px"
                 @submit="submit">
        <template #extra>
          <el-button type="success" :icon="Plus">添加</el-button>
          <el-button type="primary" :icon="Edit">编辑</el-button>
          <el-button type="danger" :icon="Delete">删除</el-button>
          <el-button type="warning" :icon="Refresh">刷新</el-button>
        </template>
      </FormQuery>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
import {reactive} from "vue";
import {PageWrapper, Form, FormQuery} from "~/components";
import {getSearchFormData} from './data'
import {Plus, Edit, Delete, Refresh} from '@element-plus/icons-vue'

const formProps = reactive({
  showLabel: true,
  labelPosition: 'right',
  labelWidth: 100,
  size: 'default',
  action: {
    singleLine: true,
    position: 'center',
    resetText: '重置',
    submitText: '提交',
  },
  widthFull: true,
  colProps: {xs: 24, sm: 12, md: 12, lg: 8, xl: 6}
})


const searchForm = reactive({});
const formSchema = reactive(getSearchFormData());

const params = reactive({})
const submit = (e) => {
  console.log(e);
}
</script>
