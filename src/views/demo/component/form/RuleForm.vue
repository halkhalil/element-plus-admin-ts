<template>
  <PageWrapper :title="$route['meta']['title']" content-background content-full-height>
    <BasicForm class="p-2"
               ref="formRef"
               v-model="form"
               :schemas="schemas"
               :rules="rules"
               @reset="handleReset"
               @submit="handleSubmit"
               auto-width
               label-width="150px"
               :label-position="getIsMobile ? 'top' : 'right'">
    </BasicForm>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {BasicForm} from "~/components/Form";
import {PageWrapper} from '~/components/Page';
import {getRuleFormData} from "~/views/demo/component/form/data";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {reactive} from "vue";

const {getIsMobile} = useRootSetting();
const schemas = reactive(getRuleFormData())
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
const rules = reactive({
  input: [{required: true}],
  select: [{required: true}],
})

const handleReset = () => {
  console.log('reset')
}
const handleSubmit = () => {
  console.log('submit')
}
</script>
