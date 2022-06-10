<template>
  <BasicUpload :on-success="handleSuccess" :on-remove="handleRemove" :on-exceed="handleExceed"></BasicUpload>
</template>

<script lang="ts" setup>
import {BasicUpload} from '~/components/Upload'
import {ElMessage} from 'element-plus'

const props = defineProps({})
const emits = defineEmits(['update:modelValue'])

const handleSuccess = (response) => {
  const [file] = response.data;
  emits('update:modelValue', file.url);
}

const handleRemove = () => {
  emits('update:modelValue', '');
}

const handleExceed = () => {
  ElMessage.error('超过上传最大限制数量');
}
</script>