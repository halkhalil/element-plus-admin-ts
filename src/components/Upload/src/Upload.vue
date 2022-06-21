<template>
  <div>
    <el-upload ref="uploadRef"
               v-bind="props"
               :file-list="fileList"
               :on-exceed="handleExceed"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :on-success="handleSuccess"
               :on-error="handleError">
      <template #trigger>
        <el-button type="primary" v-if="props.listType !== 'picture-card'" :disabled="props.disabled">
          Upload
          <el-icon>
            <Upload/>
          </el-icon>
        </el-button>
        <el-icon v-else>
          <Plus/>
        </el-icon>
      </template>

      <el-button class="ml-3" type="success" v-if="!props.autoUpload" @click="submitUpload" :disabled="props.disabled">
        upload to server
      </el-button>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image"/>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from 'vue';
import {uploadProps} from "./props";
import {Upload, Plus} from '@element-plus/icons-vue'
import {ElMessage, genFileId, UploadUserFile} from 'element-plus';
import type {UploadProps, UploadInstance, UploadRawFile, UploadFile, UploadFiles} from "element-plus";
import {useVModel, watchOnce} from "@vueuse/core";
import {getUrlFileName} from "~/utils/utils";

const props = defineProps(uploadProps);
const emits = defineEmits(['update:modelValue', 'on-exceed', 'on-success', 'on-remove', 'on-error']);

const VModel: Ref = useVModel(props, 'modelValue', emits);
const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>()
const dialogImageUrl = ref<string>();
const dialogVisible = ref<boolean>(false)

watchOnce(VModel, () => initFileList());
onMounted(() => initFileList());

const initFileList = () => {
  if (props.limit! === 1) {
    fileList.value = VModel.value;
  } else {
    fileList.value = [...VModel.value].map(url => ({url, name: getUrlFileName(url)}));
  }
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 当允许上传文件数量为1时，覆盖前一个文件
const handleExceed: UploadProps['onExceed'] = (files: File[], uploadFiles: UploadUserFile[]) => {
  if (props.limit! === 1) {
    const uploadInstance = uploadRef.value as UploadInstance
    uploadInstance.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadInstance.handleStart(file);
    uploadInstance.submit();
  } else {
    ElMessage.error('超过最大上传文件数量:' + props.limit);
  }
  emits('on-exceed', files, uploadFiles);
}

const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  VModel.value = uploadFiles.map(file => file.url);
  emits('on-remove', uploadFile, uploadFiles);
}

const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('response',response);
  if (typeof props.transformResponse === 'function') {
    props.transformResponse(response, uploadFile, uploadFiles, VModel);
  } else {
    const {data: {url}} = response;
    uploadFile.url = url
    uploadFile.name = getUrlFileName(url)
    if (props.limit! === 1) {
      VModel.value = url;
    } else {
      VModel.value.push(url);
    }
  }
  emits('on-success', response, uploadFile, uploadFiles, VModel);
}

const handleError: UploadProps['onError'] = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const {message} = error;
  ElMessage.error({message, duration: 0, grouping: true, showClose: true,});

  emits('on-error', error, uploadFile, uploadFiles);
}

const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>