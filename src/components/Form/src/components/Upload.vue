<template>
  <BasicUpload v-bind="props"
               :file-list="defaultFileList"
               :on-remove="handleRemove"
               :on-success="handleSuccess"></BasicUpload>
</template>

<script lang="ts" setup>
import {BasicUpload} from '~/components/Upload'
import {ElMessage, genFileId, UploadFile, UploadFiles, UploadProps, UploadUserFile, UploadRawFile} from 'element-plus'
import {useVModel} from "@vueuse/core";
import {uploadProps} from "~/components/Upload/src/props";
import {computed, onMounted} from "vue";

const props = defineProps({
  ...uploadProps,
  modelValue: {
    type: [Array, String, Object],
  },
})
const emits = defineEmits(['on-success', 'update:modelValue']);
// const VModel = useVModel(props, 'modelValue', emits);

// 初始化默认文件列表
const defaultFileList = computed(() => {
  console.log(1232);
  const defaultList = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
  return defaultList.map(url => ({name:getUrlFileName(url+'' as string),url}))
})

onMounted(() => {
  // updateVModel(props.fileList as UploadFiles)
})

const getUrlFileName = (url: string) => {
  console.log('url',url)
  const _url = url?.substring(0, url?.indexOf('?'));
  return _url.substring(_url.lastIndexOf('/') + 1);
}

const updateVModel = (uploadFiles: UploadFiles) => {
  const urls = uploadFiles.map(item => item.url);
  emits('update:modelValue', [props.modelValue,...urls])
  // VModel.value = props.limit! === 1 && props.multiple === false ? (urls[0] || '') : urls;
}

const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile, uploadFiles);
  updateVModel(uploadFiles);
}

const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const {data: {url}} = response;
  uploadFile.url = url
  // uploadFile.name = name
  updateVModel(uploadFiles);
  // VModel.value = url;
  console.log('handleSuccess', uploadFiles);
  // emits('on-success', response, VModel)
}
</script>