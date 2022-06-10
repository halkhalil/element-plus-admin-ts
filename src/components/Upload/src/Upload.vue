<template>
  <div>
    <el-upload v-bind="props" :on-preview="handlePreview">
      <template #trigger>
        <el-button type="primary" v-if="props.listType !== 'picture-card'">
          Upload
          <el-icon>
            <Upload/>
          </el-icon>
        </el-button>
        <el-icon v-else>
          <Plus/>
        </el-icon>
      </template>
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
import type {UploadProps} from "element-plus";

const props = defineProps(uploadProps);

const dialogImageUrl = ref();
const dialogVisible = ref(false)


const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>