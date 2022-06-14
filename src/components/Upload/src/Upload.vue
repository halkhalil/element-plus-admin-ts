<template>
  <div>
    <el-upload ref="uploadRef"
               :on-preview="handlePreview"
               :on-exceed="handleExceed"
               :on-success="handleSuccess"
               v-bind="props"
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
import {genFileId} from 'element-plus';
import type {UploadProps, UploadInstance, UploadRawFile, UploadFile, UploadFiles} from "element-plus";

const props = defineProps(uploadProps);

const uploadRef = ref<UploadInstance>()
const dialogImageUrl = ref();
const dialogVisible = ref(false)

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleExceed: UploadProps['onExceed'] = (files: File[]) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
  submitUpload();
}

const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const {data: {url}} = response;
  uploadFile.url = url
}

const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>