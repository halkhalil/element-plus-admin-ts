<template>
  <el-dialog v-model="VModel" v-bind="$props"
             :fullscreen="props.fullscreen || getIsMobile"
             :draggable="true"
             :close-on-click-modal="false">
    <template v-for="name in Object.keys(slots)">
      <slot v-if="name !== 'header'" :name="name"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {computed, useSlots} from "vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {dialogProps} from "element-plus";
import {useVModel} from "@vueuse/core";

const props = defineProps(dialogProps);
const emit = defineEmits(['update:modelValue']);
const slots = useSlots();
const {getIsMobile} = useRootSetting();
const VModel = useVModel(props, 'modelValue', emit);
</script>