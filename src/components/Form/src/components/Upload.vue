<template>
  <BasicUpload v-bind="props"
               :file-list="fileList"
               :on-remove="handleRemove"
               :on-success="handleSuccess"></BasicUpload>
</template>

<script lang="ts" setup>
import {BasicUpload} from '~/components/Upload'
import {UploadFile, UploadFiles, UploadProps, UploadUserFile} from 'element-plus'
import {useVModel, watchOnce} from "@vueuse/core";
import {uploadProps} from "~/components/Upload/src/props";
import {Ref, ref} from "vue";
import {getUrlFileName} from "~/utils/utils";

const props = defineProps({...uploadProps, modelValue: Array, transform: Function})
const emits = defineEmits(['on-success', 'update:modelValue']);
const VModel: Ref = useVModel(props, 'modelValue', emits);

const fileList = ref<UploadUserFile[]>()

watchOnce(VModel, () => {
  fileList.value = [...VModel.value].map(url => ({url, name: getUrlFileName(url)}));
})

const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  VModel.value = uploadFiles.map(file => file.url);
}

const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  if (typeof props.transform === 'function') {
    props.transform(response, uploadFile, uploadFiles, VModel);
  }
}
</script>