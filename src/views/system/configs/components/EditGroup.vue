<template>
  {{formModel}}
  <div v-loading="loading.lists">
    <basic-form
      ref="formRef"
      v-model="formModel"
      label-position="right"
      label-width="120px"
      :schemas="formSchemas">
      <template #actions="{formRef}">
        <el-button type="primary" @click="submitForm(formRef,{data:formModel},true)" :loading="loading.submit">提交
        </el-button>
      </template>
    </basic-form>
  </div>
</template>

<script lang="ts" setup>
import {BasicForm} from "~/components/Form";
import {inject, ref, watch} from "vue";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {FormSchema} from "~/components/Form/src/types";
import {ConfigItem} from "~/api/config/ConfigModel";
import {FormInstance} from "element-plus";
import {startCase} from 'lodash-es'

const formRef = ref<FormInstance>()
const formModel = ref({})
const formSchemas = ref<FormSchema[]>([]);

const apiResources = <UseApiResourcesReturn>inject('apiResources');
const {lists, loading, submitForm} = apiResources

const object2array = (object) => {
  return Object.keys(object).map(item => {
    return {value: item, label: object[item]};
  });
}

watch(lists, () => {
  formModel.value = {};
  formSchemas.value = [];
  (lists.value as ConfigItem[]).forEach((config: ConfigItem) => {
    const {name, value, label, component, component_props, parse_enum} = config;
    formModel.value[name] = value;

    const schemas: FormSchema = {
      field: name,
      label: label,
      component: startCase(component),
      componentProps: {...config.parse_component_props, options: object2array(parse_enum)},
    }

    formSchemas.value?.push(schemas);
  });
});
</script>