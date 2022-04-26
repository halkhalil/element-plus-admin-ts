<template>
  <el-form ref="formElRef" :model="formModel" v-bind="props">
    <el-row :gutter="30" v-if="schemas.length > 0">
      <FormItem v-for="(schema,index) in schemas"
                :key="index"
                :schema="schema"
                v-model="formModel[schema['field']]"
                v-show="showAdvancedButton ? index < showAdvancedLength || getIsAdvanced : true">
        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="{...schema,...data}"></slot>
        </template>
      </FormItem>
      <FormAction v-bind="getActionProps" @toggle-advanced="toggleAdvanced">
        <template v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']" #[item]="data">
          <slot :name="item" v-bind="data"></slot>
        </template>
      </FormAction>
    </el-row>
    <el-empty v-else></el-empty>
  </el-form>
</template>

<script lang="ts" setup>
import FormItem from "./components/FormItem.vue";
import FormAction from "./components/FormAction.vue";
import {toRefs, unref, provide, ref, computed} from "vue";
import {useVModel} from "@vueuse/core";
import {FormInstance} from "element-plus";
import {basicFormProps} from "~/components/Form/src/props";

const props = defineProps(basicFormProps);
const emits = defineEmits(['update:modelValue', 'reset', 'submit', 'toggle-advanced']);

const {schemas = [], actionProps = {}} = toRefs(props);

const formModel = useVModel(props, 'modelValue', emits);
const {showAdvancedButton = false, showAdvancedLength = 3} = unref(actionProps);
const formElRef = ref<FormInstance>();

const getIsAdvanced = ref(false);
const getActionProps = computed(() => {
  return {isAdvanced: getIsAdvanced.value, ...unref(actionProps)};
});


// 高级搜索
const toggleAdvanced = () => {
  getIsAdvanced.value = !getIsAdvanced.value;
  emits('toggle-advanced', getIsAdvanced.value);
}

const handleSubmit = async (formEl: FormInstance | undefined) => {
  console.log(formEl)
  if (!formEl) return;
  console.log(111)
  await formEl.validate((valid, fields) => {
    console.log(222)
    emits('submit', valid);
  })
}
const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emits('reset');
}

provide('formElRef', formElRef);
provide('handleReset', handleReset);
provide('handleSubmit', handleSubmit)
</script>