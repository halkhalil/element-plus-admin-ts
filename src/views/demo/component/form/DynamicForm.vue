<template>
  <page-wrapper :title="$route?.meta?.title" content-full-height>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" class="my-1">
        <el-button @click="changFieldLabel(0)" class="w-full">更改字段1Label</el-button>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" class="my-1">
        <el-button @click="changFieldValue('input')" class="w-full">更改字段1Value</el-button>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" class="my-1">
        <el-button @click="appendSchema" class="w-full">向最后追加一个字段</el-button>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" class="my-1">
        <el-button @click="deleteLastSchema" class="w-full">删除最后一个字段</el-button>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" class="my-1">
        <el-button @click="autoWidth=!autoWidth" class="w-full">自动宽度{{ autoWidth }}</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="50">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <BasicForm class="m-2"
                   ref="formRef"
                   v-model="form"
                   :schemas="schemas"
                   @reset="handleReset"
                   @submit="handleSubmit"
                   :auto-width="autoWidth"
                   label-width="90px"
                   :label-position="getIsMobile ? 'top' : 'right'">
        </BasicForm>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <pre>{{form}}</pre>
      </el-col>
    </el-row>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {getDynamicFormData} from "./data";
import {BasicForm} from "~/components/Form/index.ts";
import {PageWrapper} from '~/components/Page/index.ts';
import {reactive, ref} from "vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {FormSchema} from "~/components/Form/src/types";

const formRef = ref();
const {getIsMobile} = useRootSetting();
const schemas: FormSchema[] = reactive(getDynamicFormData());
const autoWidth = ref(false)
const form = reactive({});


const handleReset = () => {
  formRef.value.resetFields();
};
const handleSubmit = () => {
  formRef.value.validate((e) => {
    console.log('e', e);
  });
};

const changFieldLabel = (index) => schemas[index]['label'] = 'Label';
const changFieldValue = (field) => form[field] = 'newValue';
const appendSchema = () => schemas.push({field: 'newField', label: '新字段', component: 'Input'} as FormSchema);
const deleteLastSchema = () => schemas.splice(schemas.length - 1, 1);

</script>
