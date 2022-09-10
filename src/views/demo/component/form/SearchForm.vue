<template>
  <page-wrapper
    :title="$route.meta?.title"
    content-full-height>
    <div class="p-5 mb-2">
      <el-divider content-position="left">表单选项</el-divider>
      <el-form v-model="formProps" inline>
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
        <el-form-item label="超过数量折叠">
          <el-input-number v-model="formProps.actionProps.showAdvancedLength"></el-input-number>
        </el-form-item>
        <el-form-item label="按钮位置">
          <el-radio-group v-model="formProps.actionProps.position">
            <el-radio-button label="left"/>
            <el-radio-button label="center"/>
            <el-radio-button label="right"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="按钮单独一行">
          <el-switch v-model="otherForm.buttonLine" @change="changeButtonLine"></el-switch>
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
      <BasicForm v-model="searchForm"
                 :schemas="formSchema"
                 v-bind="formProps"
      ></BasicForm>
    </div>

    <el-divider content-position="left">数据预览</el-divider>
    <pre class="m-5">{{ searchForm }}</pre>
  </page-wrapper>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {BasicForm} from "~/components/Form";
import {getSearchFormData} from './data'
import {PageWrapper} from '~/components/Page';

const formProps = reactive({
  showLabel: true,
  labelPosition: 'right',
  labelWidth: 100,
  size: 'default',
  actionProps: {
    position: 'left',
    advanced: false,
    actionPosition: 'right',
    showAdvancedButton: true,
    showAdvancedLength: 3,
  },
  colProps: {xs: 24, sm: 12, md: 12, lg: 8, xl: 6}
})

const otherForm = reactive({
  buttonLine: false,
})

const searchForm = reactive({});
const formSchema = reactive(getSearchFormData());

const changeButtonLine = (boolean) => {
  const colProps = boolean ? {span: 24} : undefined;
  formProps.actionProps['colProps'] = colProps;
}
</script>
