<template>
  <div :style="{textAlign:position}" class="w-full">
    <slot name="submitBefore"></slot>
    <el-button type="primary" v-bind="submitButtonProps" @click="submitForm(formRef)">
      {{ submitButtonText }}
    </el-button>
    <slot name="resetBefore"></slot>
    <el-button type="default" v-bind="resetButtonProps" v-if="showResetButton" @click="resetForm(formRef)">
      {{ resetButtonText }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import {inject, toRefs} from "vue";
import {FormInstance} from "element-plus";
import {formActionProps} from "./props";

const props = defineProps(formActionProps);

const {
  submitButtonProps,
  submitButtonText,
  resetButtonProps,
  resetButtonText,
  showResetButton,
  position,
} = toRefs(props);

const formRef = inject<FormInstance>('formRef');
const submitForm = inject('submitForm');
const resetForm = inject('resetForm');
</script>