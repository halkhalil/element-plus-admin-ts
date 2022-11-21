<template>
  <el-form-item v-bind="elFormItemProps" :prop="field" :label="props.showLabel && label">
    <component v-if="!slot"
               :is="getComponent"
               v-model="VModel"
               v-bind="getComponentProps"
               v-on="getComponentEvents"></component>
    <slot v-else :name="slot" v-bind="props.schema"></slot>
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </el-form-item>
</template>

<script lang="ts" setup>
import {computed, toRefs, h} from 'vue'
import {isFunction} from "~/utils/is";
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

const getComponentEvents = computed(() => {
  const {componentEvents = {}} = props.schema;
  return componentEvents;
})

</script>