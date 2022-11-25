<template>
  <PageWrapper :title="$route['meta']['title']" content-full-height content-background>
    <div class="flex-center">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <Form
            v-model="form"
            :schemas="formSchemas"
            width-full
            label-width="150px"
            :label-position="getIsMobile ? 'top' : 'right'">
            <template #action="{formRef}">
              <el-col class="text-center">
                <el-button type="danger" @click="fetchInfo" :loading="loading">异步加载数据</el-button>
                <el-button type="default" @click="handleReset(formRef)">重置</el-button>
                <el-button type="primary" @click="handleSubmit(formRef)">提交</el-button>
              </el-col>
            </template>
          </Form>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <pre class="m-5">{{ form }}</pre>
        </el-col>
      </el-row>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {getBasicFormData} from "./data";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {reactive, ref} from "vue";
import {PageWrapper, Form} from "~/components";
import {ElMessage, FormInstance} from "element-plus";

const form = ref<Record<any, any>>({
  input: "",
  input_number: 0,
  select: "",
  time_picker: "",
  date_picker: "",
  cascader: [],
  slider: 2,
  radio_group: "",
  radio_button_group: "",
  checkbox_group: [],
  checkbox_button_group: [],
  date_time_picker: "",
  time_select: "",
  upload: []
});
const formSchemas = reactive(getBasicFormData())
const {getIsMobile} = useRootSetting();
const handleReset = (formEl: FormInstance) => {
  formEl.resetFields();
  ElMessage.success('handle reset')
};
const handleSubmit = async (formEl: FormInstance) => {
  await formEl.validate();
  ElMessage.success('handle submit')
};

const loading = ref(false);
// 模拟数据请求
const fetchInfo = () => {
  const response = {
    input: "2342 ",
    input_number: 12321,
    select: "value1",
    time_picker: "16:40:33",
    date_picker: "2021-06-18",
    cascader: ["value2", "value1"],
    slider: 17,
    radio_group: "value2",
    radio_button_group: "value2",
    checkbox_group: ["value1", "value2"],
    checkbox_button_group: ["value1"],
    date_time_picker: "2021-06-17 00:00:00",
    time_select: "11:00",
    upload: ['http://element-plus-admin.local/storage/Us7YqWbcme8De8mUhyYDE0289TnDykxrfKFTyTrC.png']
  };
  loading.value = true;
  setTimeout(() => {
    form.value = response;
    loading.value = false;
  }, 2000)

}
</script>
