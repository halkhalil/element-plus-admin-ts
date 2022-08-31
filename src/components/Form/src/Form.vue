<template>
  <el-form ref="formElRef" v-bind="props" :rules="rules" :model="formModel"
           :label-width="showLabel && props.labelWidth">
    <el-row :gutter="10" v-if="schemas.length > 0">
      <el-col v-for="(schema,index) in schemas" v-bind="colProps" v-show="showSchema(schema,index)">
        <FormItem :key="index"
                  :schema="schema"
                  :show-label="showLabel"
                  v-model="formModel[schema['field']]">
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="{...schema,...data}"></slot>
          </template>
        </FormItem>
      </el-col>

      <FormAction v-bind="actionProps"
                  :advanced="advanced"
                  @toggle-advanced="toggleAdvanced">
        <template v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']" #[item]="data">
          <slot :name="item" v-bind="data"></slot>
        </template>
      </FormAction>
    </el-row>
    <el-empty v-else></el-empty>
  </el-form>
</template>

<script lang="ts" setup>
import FormItem from "./FormItem.vue";
import FormAction from "./FormAction.vue";
import {computed, provide, ref, toRefs, unref,} from "vue";
import {useVModel} from "@vueuse/core";
import {FormInstance, FormRules} from "element-plus";
import {formProps} from "./props";
import {FormProps, FormSchema} from "./types";
import {isBoolean, isFunction} from "~/utils/is";

const props = defineProps(formProps);
const emits = defineEmits(['update:modelValue', 'reset', 'submit', 'toggle-advanced']);

const {schemas = [] as FormSchema[], rules = [] as FormRules[], actionProps, colProps, showLabel} = toRefs(props);

const formElRef = ref<FormInstance>();
const formModel = useVModel(props, 'modelValue', emits);
const advanced = ref<boolean>(unref(actionProps)?.advanced);

const showSchema = (schema, index) => {
  let isShow = true;
  if (isBoolean(schema.show)) isShow = schema.show;
  if (isFunction(schema.show)) isShow = schema.show(schema);

  const {showAdvancedButton = false, showAdvancedLength = 3} = actionProps?.value;
  if (showAdvancedButton) {
    isShow = index < showAdvancedLength || advanced.value
  }

  return isShow;
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    emits('submit', valid, fields);
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emits('reset');
}

const toggleAdvanced = () => {
  advanced.value = !advanced.value;
  emits('toggle-advanced', advanced.value);
}

provide('colProps', colProps);
provide('formElRef', formElRef);
provide('submitForm', submitForm);
provide('resetForm', resetForm)
provide('toggleAdvanced', toggleAdvanced)
</script>