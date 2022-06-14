<template>
  <pre>{{uploadProps}}</pre>

  <BasicUpload v-bind="props" :on-success="handleSuccess"></BasicUpload>
</template>

<script lang="ts" setup>
import {BasicUpload} from '~/components/Upload'
import {ElMessage, genFileId, UploadFile, UploadFiles, UploadProps, UploadRawFile} from 'element-plus'
import {useVModel} from "@vueuse/core";
import {uploadProps} from "~/components/Upload/src/props";

const props = defineProps({
  ...uploadProps,
  modelValue: {
    type: [Array, Number, String, Object],
  },
})
const emits = defineEmits(['onSuccess']);
const VModel = useVModel(props, 'modelValue', emits);

const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const {data: {url}} = response;
  uploadFile.url = url
  VModel.value= url;
  emits('onSuccess', response, VModel)
}
</script>