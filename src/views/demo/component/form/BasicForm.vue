<template>
  <PageWrapper :title="$route['meta']['title']" content-full-height content-background>
    <div class="flex-center">
      <div shadow="none" class="p-5 max-w-screen-xl">
        <BasicForm
          v-model="form"
          :schemas="schemas"
          label-width="150px"
          :label-position="getIsMobile ? 'top' : 'right'"
          @submit="handleSubmit"
          @reset="handleReset"
        ></BasicForm>
      </div>
    </div>
    <el-divider content-position="left">数据预览</el-divider>
    <pre class="m-5">{{ form }}</pre>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page';
import {getBasicFormData} from "~/views/demo/component/form/data";
import {BasicForm} from "~/components/Form";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {reactive,} from "vue";

const {getIsMobile} = useRootSetting();
const schemas = reactive(getBasicFormData());

const form = reactive({
  input: "",
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
  time_select: "11:00"
})

const handleReset = () => {
  console.log('reset')
};
const handleSubmit = () => {
  console.log('submit')
};
</script>
