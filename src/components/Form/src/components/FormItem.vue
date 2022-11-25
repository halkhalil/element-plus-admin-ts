<template>
  <el-form-item v-bind="elFormItemProps" :prop="field" :label="props.showLabel && label" class="ba-form-component">
    <component v-if="!slot"
               :is="getComponent"
               v-model="VModel"
               v-bind="getComponentProps"
               v-on="getComponentEvents" :class="{'ba-component_w-full':widthFull}"></component>
    <slot v-else :name="slot" v-bind="props.schema"></slot>
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </el-form-item>
</template>

<script lang="ts" setup>
import {computed, toRefs, h, inject} from 'vue'
import {isFunction} from "~/utils/is";
import {componentMap} from '../componentMap'
import {useVModel} from "@vueuse/core";
import {formItemProps} from "../props";

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

const widthFull = <boolean>inject('widthFull')
</script>
<style lang="scss">
.ba-component_w-full {
  width: 100% !important;

  &.el-date-editor {
    .el-input__wrapper {
      display: flex !important;
    }
  }
}

</style>
