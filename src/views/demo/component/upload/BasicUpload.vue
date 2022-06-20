<template>
  <PageWrapper :title="$route['meta']['title']" content-full-height content-background>
    <div class="p-5">
      <el-form v-model="uploadProps">
        <el-form-item label="文件上传地址">
          <el-input v-model="uploadProps.action"></el-input>
        </el-form-item>
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
        <el-form-item label="是否禁用上传">
          <el-switch v-model="uploadProps.disabled"></el-switch>
        </el-form-item>
        <el-form-item label="允许上传文件的最大数量	">
          <el-input-number v-model="uploadProps.limit"></el-input-number>
        </el-form-item>
        <el-form-item label="自定义响应数据格式">
          <el-switch v-model="customResponse"></el-switch>
        </el-form-item>
      </el-form>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-divider content-position="left">组件预览</el-divider>
          <BasicUpload v-model="files" v-bind="uploadProps"
                       :transform-response="customResponse && transformResponse"></BasicUpload>
        </el-col>
        <el-col :span="12">
          <el-divider content-position="left">数据预览</el-divider>
          <pre>{{ files }}</pre>
        </el-col>
      </el-row>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {BasicUpload} from '~/components/Upload';
import type {UploadProps} from 'element-plus'
import {UploadFile, UploadFiles} from "element-plus";
import {getUrlFileName} from "~/utils/utils";

const uploadProps = reactive<Partial<UploadProps>>({
  action: import.meta.env.VITE_UPLOAD_URL,
  listType: 'text',
  autoUpload: true,
  disabled: false,
  multiple: true,
  limit: 3,
  accept: '',
});

const customResponse = ref<boolean>(false);

// 自定义响应数据格式
const transformResponse = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles, VModel) => {
  const {data: {url, name}} = response;
  uploadFile.url = url
  uploadFile.name = name
  VModel.value.push({url});
}

const files = ref(['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'])
</script>