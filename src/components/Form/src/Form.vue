<template>
  <el-form ref="formRef" v-bind="$props" :rules="rules" :model="formModel"
           :label-width="showLabel && props.labelWidth"
           :label-position="getIsMobile ? 'top' : labelPosition">
    <el-row :gutter="10" v-if="schemas.length > 0">

      <el-col v-for="(schema,index) in schemas"
              v-bind="colProps"
              v-if="ifShowSchema(schema)"
              v-show="showSchema(schema)">
        <FormItem :key="index"
                  :schema="schema"
                  :show-label="showLabel"
                  v-model="formModel[schema['field']]">
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="{...schema,...data}"></slot>
          </template>
        </FormItem>
      </el-col>

      <el-col v-bind="action.singleLine ? {span:24} : colProps">
        <slot name="action" :model="formModel" :formRef="formRef">
          <el-form-item :label-width="showLabel ? labelWidth : 0">
            <div :style="{textAlign:action.position}" class="w-full">
              <el-button type="default" @click="resetForm(formRef)">{{ action.resetText }}</el-button>
              <el-button type="primary" @click="submitForm(formRef)">{{ action.submitText }}</el-button>
            </div>
          </el-form-item>
        </slot>
      </el-col>
    </el-row>
    <el-empty v-else></el-empty>
  </el-form>
</template>

<script lang="ts" setup>
import FormItem from "./components/FormItem.vue";
import {computed, onMounted, provide, ref, toRefs} from "vue";
import {useVModel} from "@vueuse/core";
import {FormInstance, FormRules} from "element-plus";
import {formProps, defaultFormActionProps} from "./props";
import {FormAction, FormSchema} from "./types";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const props = defineProps(formProps);
const emits = defineEmits(['update:modelValue', 'update:refObj', 'reset', 'submit']);

const {
  schemas = [] as FormSchema[],
  rules = [] as FormRules[],
  colProps,
  showLabel,
  labelWidth,
  labelPosition,
  widthFull,
} = toRefs(props);

const action = computed(() => {
  return {...defaultFormActionProps, ...props.action} as FormAction;
});

const formRef = ref<FormInstance>();
const formModel = useVModel(props, 'modelValue', emits);
const {getIsMobile} = useRootSetting();

// v-show控制隐藏显示
const showSchema = (schema: FormSchema) => {
  let isShow = true;
  if (typeof schema?.show === 'boolean') isShow = schema.show;
  if (typeof schema?.show === 'function') isShow = schema.show(schema);
  return isShow;
};

// v-if控制隐藏显示
const ifShowSchema = (schema: FormSchema) => {
  let isIfShow = true;
  if (typeof schema?.ifShow === 'boolean') isIfShow = schema?.ifShow;
  if (typeof schema?.ifShow === 'function') isIfShow = schema?.ifShow(schema);
  return isIfShow;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const valid = await formEl.validate()
  emits('submit', valid);
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emits('reset');
}


onMounted(() => emits('update:refObj', formRef.value));

provide('widthFull', widthFull);
provide('formRef', formRef);
</script>