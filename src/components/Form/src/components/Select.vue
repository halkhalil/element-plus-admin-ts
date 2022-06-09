<template>
  <el-select v-model="VModel" v-bind="$props">
    <template v-for="(option,index) in options">
      <el-option-group v-if="option.options" v-bind="option">
        <el-option v-for="(childOption,childIndex) in option.options"
                   :key="childIndex"
                   v-bind="childOption"></el-option>
      </el-option-group>
      <el-option v-else :key="index" v-bind="option"></el-option>
    </template>
  </el-select>
</template>

<script lang="ts" setup>
import {useVModel} from "@vueuse/core";
import {toRefs} from "vue";

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [Array, Number, String, Object],
  },
  options: {
    type: Array,
  },
});

const VModel = useVModel(props, 'modelValue', emits);
const {options} = toRefs(props);
</script>