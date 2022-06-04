<template>
  <PageWrapper :title="$route['meta']['title']" content-full-height content-background>
    <div class="flex-center">
      <div shadow="none" class="p-5 max-w-screen-xl">
        <BasicForm
          v-model="form"
          :schemas="schemas"
          :rules="rules"
          label-width="150px"
          :label-position="getIsMobile ? 'top' : 'right'"
          @submit="handleSubmit"
          @reset="handleReset"
        ></BasicForm>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page';
import {getFormData} from "~/views/demo/component/form/formData";
import {BasicForm} from "~/components/Form";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {reactive,} from "vue";
import {FormRules} from "element-plus";

const {getIsMobile} = useRootSetting();
const schemas = reactive(getFormData());

const rules = reactive<FormRules>({
  input: [
    {required: true, message: '这是必填项', trigger: 'blur'},
    {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
  ]
});
const form = reactive({
  input: "",
  input_number: 12321,
  select: "value1",
  time_picker: "16:40:33",
  date_picker: "2021-06-18",
  cascader: ["value2", "value1"],
  slider: 17,
  radio_group: "value2",
  checkbox_group: ["value1", "value2"],
  checkbox_button_group: ["value1"],
  radio_button_group: "value2",
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
