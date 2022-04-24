<template>
  <el-col v-if="showAction" :style="{textAlign:position}" v-bind="colProps">
    <el-form-item :label-width="0">
      <div class="flex-row start">
        <slot name="resetBefore"></slot>
        <el-button type="default" v-bind="$props.resetButtonProps" v-if="showResetButton"
                   @click="handleReset(formElRef)">
          {{ $props.resetButtonText }}
        </el-button>
        <slot name="submitBefore"></slot>
        <el-button type="primary" v-bind="$props.submitButtonProps" v-if="showSubmitButton"
                   @click="handleSubmit(formElRef)">
          {{ $props.submitButtonText }}
        </el-button>
        <slot name="advanceBefore"></slot>
        <el-button type="text"
                   v-if="showAdvancedButton"
                   :icon="!$props.isAdvanced ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
                   @click="toggleAdvanced">
          {{ !$props.isAdvanced ? '展开' : '收起' }}
        </el-button>
        <slot name="advanceAfter"></slot>
      </div>
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import {inject} from "vue";
import {FormInstance} from "element-plus";

const props = defineProps({
  showAction: {
    type: Boolean,
    default: true,
  },
  showResetButton: {
    type: Boolean,
    default: true,
  },
  resetButtonProps: {
    type: Object,
    default: () => ({})
  },
  resetButtonText: {
    type: String,
    default: '重置'
  },
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  submitButtonProps: {
    type: Object,
    default: () => ({})
  },
  submitButtonText: {
    type: String,
    default: '提交'
  },
  showAdvancedButton: {
    type: Boolean,
    default: false,
  },
  showAdvancedLength: {
    type: Number,
    default: 3,
  },
  isAdvanced: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'right',
  },
  colProps: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['toggle-advanced'])

const formElRef = inject<FormInstance>('formElRef');
const toggleAdvanced = () => emit('toggle-advanced');
const handleSubmit = inject('handleSubmit')
const handleReset = inject('handleReset')
</script>