<template>
  <el-upload
    :on-preview="handlePreview"
    v-bind="props"
  >
    <el-button v-bind="props">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">{{ props.tips }}</div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="">
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {props} from "./props";
import {UploadProps} from "element-plus";

const dialogImageUrl = ref();
const dialogVisible = ref(false)


const handlePreview:UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>