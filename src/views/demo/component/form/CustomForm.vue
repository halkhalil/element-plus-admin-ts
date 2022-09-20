<template>
  <page-wrapper
    :title="$route['meta']['title']"
    content-background
    content-full-height>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-divider>组件预览</el-divider>
        <basic-form class="p-4"
                    ref="formRef"
                    v-model="form"
                    :schemas="schemas"
                    @reset="handleReset"
                    @submit="handleSubmit"
                    auto-width
                    label-width="150px"
                    :label-position="getIsMobile ? 'top' : 'right'">
          <template #custom>
            <el-input v-model="form.input3" placeholder="自定义Slot"></el-input>
          </template>
        </basic-form>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-divider>数据预览</el-divider>
        <pre>{{ form }}</pre>
      </el-col>
    </el-row>

  </page-wrapper>
</template>

<script lang="ts" setup>
import {BasicForm} from "~/components/Form/index.ts";
import {ElInput, FormInstance} from 'element-plus';
import {PageWrapper} from '~/components/Page/index.ts';
import {reactive, ref} from "vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const formRef = ref(null);
const {getIsMobile} = useRootSetting();
const schemas = reactive([
  {
    field: 'input1',
    label: 'render方式',
    component: 'Input',
    render: (h, modelValue) => {
      return h(ElInput, {
        placeholder: '请输入',
        type: 'text',
        onInput: (e) => {
          console.log(e);
        },
      }, {prepend: () => 'http://'});
    }
  },
  {
    field: 'input2',
    label: '输入框',
    component: 'Input',
    componentProps: {
      placeholder: '这是一个Input表单',
    },
  },
  {
    field: 'input3',
    label: '自定义Slot',
    slot: 'custom',
    component: 'Input',
    componentProps: {
      placeholder: '这是一个Input表单',
    },
  },
])
const form = reactive({
  input1: "value1",
  input2: "value2",
  input3: "value3",
})
const handleReset = (formRef: FormInstance) => formRef.resetFields();
const handleSubmit = (formRef: FormInstance) => {
  formRef.validate((e) => {
    console.log('e', e);
  });
};
</script>
