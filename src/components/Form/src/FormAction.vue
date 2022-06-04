<template>
  <el-form-item label-width="0px">
    <div :style="{textAlign:position}">
      <slot name="submitBefore"></slot>
      <el-button type="primary" v-bind="submitButtonProps" @click="submitForm(formElRef)">
        {{ submitButtonText }}
      </el-button>
      <slot name="resetBefore"></slot>
      <el-button type="default" v-bind="resetButtonProps" v-if="showResetButton" @click="resetForm(formElRef)">
        {{ resetButtonText }}
      </el-button>
      <slot name="advanceBefore"></slot>
      <el-button v-if="showAdvancedButton"
                 type="primary"
                 link
                 :icon="!advanced ? ArrowDownBold : ArrowUpBold"
                 @click="toggleAdvanced">
        {{ !advanced ? '展开' : '收起' }}
      </el-button>
      <slot name="advanceAfter"></slot>
    </div>
  </el-form-item>
</template>

<script lang="ts" setup>
import {inject, toRefs} from "vue";
import {FormInstance} from "element-plus";
import {formActionProps} from "./props";
import {ArrowDownBold, ArrowUpBold} from '@element-plus/icons'

const props = defineProps(formActionProps);
const emits = defineEmits(['toggle-advanced']);

const {
  submitButtonProps,
  submitButtonText,
  resetButtonProps,
  resetButtonText,
  showResetButton,
  advanced,
  position,
  showAdvancedButton,
} = toRefs(props);

const formElRef = inject<FormInstance>('formElRef');
const submitForm = inject('submitForm');
const resetForm = inject('resetForm');
const toggleAdvanced = inject('toggleAdvanced');
</script>