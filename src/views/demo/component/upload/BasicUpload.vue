<template>
  <PageWrapper :title="$route['meta']['title']" content-full-height content-background>
    <div class="p-5">
      <el-divider content-position="left">表单选项</el-divider>
      <el-form v-model="uploadProps">
        <el-form-item label="文件列表类型">
          <el-radio-group v-model="uploadProps.listType">
            <el-radio-button label="text"/>
            <el-radio-button label="picture"/>
            <el-radio-button label="picture-card"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否自动上传">
          <el-switch v-model="uploadProps.autoUpload"></el-switch>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">上传预览</el-divider>
      <BasicUpload v-bind="uploadProps" :file-list="fileList"></BasicUpload>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {BasicUpload} from '~/components/Upload';
import type {UploadProps, UploadUserFile} from 'element-plus'

const uploadProps = reactive({
  listType: 'text',
  autoUpload: true,
});

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])
</script>