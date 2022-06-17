<template>
  <PageWrapper :title="$route['meta']['title']" content-full-height content-background>
    <div class="flex-center">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-divider content-position="left">组件预览</el-divider>
          <BasicForm
            v-model="form"
            :schemas="formSchemas"
            label-width="150px"
            :label-position="getIsMobile ? 'top' : 'right'"
            @submit="handleSubmit"
            @reset="handleReset"
          >
            <template #submitBefore>
              <el-button type="danger" @click="fetchInfo" :loading="loading">异步加载数据</el-button>
            </template>
          </BasicForm>
        </el-col>
        <el-col :span="12">
          <el-divider content-position="left">数据预览</el-divider>
          <pre class="m-5">{{ form }}</pre>
        </el-col>
      </el-row>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {getBasicFormData} from "~/views/demo/component/form/data";
import {BasicForm} from "~/components/Form";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";

const form = ref({
  input: '',
  input_number: 0,
  select: "",
  switch: false,
});
const formSchemas = reactive(getBasicFormData())
const loading = ref(false);


const {getIsMobile} = useRootSetting();
const handleReset = () => ElMessage.info('handle reset');
const handleSubmit = () => ElMessage.info('handle submit');

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
