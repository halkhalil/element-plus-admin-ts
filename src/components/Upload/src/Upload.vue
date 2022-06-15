<template>
  <div>
    <el-upload ref="uploadRef"
               v-bind="props"
               :on-preview="handlePreview"
    >
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
import {ref} from 'vue';
import {uploadProps} from "./props";
import {Upload, Plus} from '@element-plus/icons-vue'
import {genFileId, UploadUserFile} from 'element-plus';
import type {UploadProps, UploadInstance, UploadRawFile, UploadFile, UploadFiles} from "element-plus";

const props = defineProps(uploadProps);
const emits = defineEmits(['on-exceed', 'on-success']);

const uploadRef = ref<UploadInstance>()
const dialogImageUrl = ref();
const dialogVisible = ref(false)

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile, uploadFiles);

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

  }
  emits('on-exceed', files, uploadFiles);
}

const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const {data: {url}} = response;
  uploadFile.url = url
  emits('on-success', response, uploadFile, uploadFiles);
}

const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>