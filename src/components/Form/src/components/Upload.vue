<template>
  <BasicUpload v-bind="props"
               :on-remove="handleRemove"
               :on-success="handleSuccess"></BasicUpload>
</template>

<script lang="ts" setup>
import {BasicUpload} from '~/components/Upload'
import {UploadFile, UploadFiles, UploadProps} from 'element-plus'
import {useVModel} from "@vueuse/core";
import {uploadProps} from "~/components/Upload/src/props";
import {getUrlFileName} from "~/utils/utils";

const props = defineProps({
  ...uploadProps,
  modelValue: {
    type: [Array, String, Object],
  },
})
const emits = defineEmits(['on-success', 'update:modelValue']);
const VModel = useVModel(props, 'modelValue', emits);

const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile)
  VModel.value = uploadFiles.map(file => file.url);
}

const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const {data: {url}} = response;
  uploadFile.url = url
  uploadFile.name = getUrlFileName(url)
  VModel.value?.push(url);
}
</script>