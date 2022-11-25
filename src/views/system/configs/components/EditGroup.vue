<template>
  <div v-loading="loading.lists">
    <Form
      ref="formRef"
      class="sm:w-full lg-sm:w-screen-xxl"
      v-model="formModel"
      :label-position="getIsMobile ? 'top' : 'right'"
      label-width="120px"
      width-full
      :action="{singleLine:true}"
      :schemas="formSchemas">
      <template #action="{formRef}">
        <div class="text-center">
          <el-button class="lt-sm:w-full"
                     type="primary"
                     @click="submitForm(formRef,{data:formModel},true)"
                     :loading="loading.submit">提交
          </el-button>
        </div>
      </template>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import {Form} from "~/components";
import {inject, nextTick, ref, watch} from "vue";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {FormSchema} from "~/components/Form/src/types";
import {ConfigItem} from "~/api/config/ConfigModel";
import {FormInstance} from "element-plus";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const formRef = ref<FormInstance>()
const formModel = ref({})
const formSchemas = ref<FormSchema[]>([]);

const apiResources = <UseApiResourcesReturn>inject('apiResources');
const {lists, loading, submitForm} = apiResources
const {getIsMobile} = useRootSetting()

const object2array = (object) => {
  return Object.keys(object).map(item => {
    return {value: item, label: object[item]};
  });
}

const init = () => {
  formModel.value = {};
  formSchemas.value = [];
  (lists.value as ConfigItem[]).forEach((config: ConfigItem) => {
    const {name, label, component, parse_props = {}, group_value, parse_extra = {}} = config;
    formModel.value[name] = group_value;

    const schemas: FormSchema = {
      field: name,
      label: label,
      component: component,
      componentProps: {...parse_props, options: object2array(parse_extra)},
    }

    formSchemas.value.push(schemas);
  });
}

watch(lists, () => nextTick(() => init()));
</script>