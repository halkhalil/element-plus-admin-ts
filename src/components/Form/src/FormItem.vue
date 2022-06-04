<template>
  <el-form-item v-bind="elFormItemProps" :prop="field" :label="props.showLabel && label">
    <component v-if="!slot"
               :is="getComponent"
               v-model="VModel"
               v-bind="getComponentProps"
               class="w-full"></component>
    <slot v-else :name="slot" v-bind="props.schema"></slot>
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </el-form-item>
</template>

<script lang="ts" setup>
import {computed, toRefs, unref, h} from 'vue'
import {isFunction, isBoolean} from "~/utils/is";
import {componentMap} from './componentMap'
import {useVModel} from "@vueuse/core";
import {formItemProps} from "./props";

const props = defineProps(formItemProps);
const emits = defineEmits(['update:modelValue'])

const {schema, modelValue} = props;
const {label, field, slot, formItemProps: elFormItemProps = {}} = toRefs(schema);

const VModel = useVModel(props, 'modelValue', emits);

const getComponent = isFunction(schema?.render) ? schema?.render(h, modelValue, schema) : componentMap.get(schema.component);

const getComponentProps = computed(() => {
  const {componentProps = {}, placeholder} = props.schema;
  if (isFunction(componentProps)) {
    return componentProps(props.schema) ?? {};
  }
  const {style = {}} = componentProps;
  return {placeholder, style, ...componentProps};
})

</script>