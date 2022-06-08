<template>
  <el-radio-group v-model="VModel" v-bind="$props">
    <el-radio v-for="(option,index) in options" :key="index" v-bind="option" :label="option.value">
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue'
import {useVModel} from "@vueuse/core";

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [Array, Number, String],
  },
  options: {
    type: Array,
  },
  button: {
    type: Boolean,
    default: false,
  }
});

const VModel = useVModel(props, 'modelValue', emits);
const {options, button} = toRefs(props);
</script>
