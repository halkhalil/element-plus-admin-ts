<template>
  <el-checkbox-group v-model="VModel" v-bind="$props">
    <el-checkbox-button v-if="button" v-for="(option) in options" :key="option.value" v-bind="option"
                        :label="option.value">
      {{ option.label }}
    </el-checkbox-button>
    <el-checkbox v-else v-for="(option) in options" :key="option.value" v-bind="option" :label="option.value">
      {{ option.label }}
    </el-checkbox>
  </el-checkbox-group>
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