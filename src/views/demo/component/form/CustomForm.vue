<template>
  <PageWrapper
    :title="$route['meta']['title']"
    content-background
    content-full-height>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <Form class="p-4"
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
        </Form>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <pre>{{ form }}</pre>
      </el-col>
    </el-row>

  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper, Form} from "~/components";
import {ElInput, FormInstance} from 'element-plus';
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
