<template>
  <PageWrapper :title="$route['meta']['title']" content-full-height content-background>
    <BasicUpload v-model="files" v-bind="uploadProps" :before-upload="handleBeforeUpload"></BasicUpload>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {BasicUpload} from '~/components/Upload';
import {reactive, ref} from "vue";
import {UploadProps, UploadRawFile, UploadRequestOptions} from "element-plus";
import {fetchOssSign} from "~/api/upload";
import axios from "axios";

const uploadProps = reactive({
  action: '',
  multiple: true,
  data: {
    key: '',
    policy: '',
    OSSAccessKeyId: '',
    success_action_status: '200',
    signature: '',
    callback: ''
  }
});
const files = ref([])
const httpRequest = async (options: UploadRequestOptions) => {
  const {data: {data: {accessid, host, policy, dir, signature, callback}}} = await fetchOssSign();

  const formData = new FormData();
  formData.append('name', options.file.name)
  formData.append('key', `${dir}/${options.file.name}`)
  formData.append('policy', policy)
  formData.append('OSSAccessKeyId', accessid)
  formData.append('success_action_status', '200')
  formData.append('signature', signature)
  formData.append('callback', callback)
  formData.append('file', options.file)
  axios.post(host, formData).then(response => {
    const file = response.data?.data;
    console.log(file);
  })
}

const handleBeforeUpload = async (rawFile: UploadRawFile) => {
  console.log(rawFile);
  const {data: {data: {accessid, host, policy, dir, signature, callback}}} = await fetchOssSign();
  uploadProps.action = host;
  uploadProps.data = {
    key: `${dir}/${rawFile.name}`,
    policy: policy,
    OSSAccessKeyId: accessid,
    success_action_status: '200',
    signature: signature,
    callback: callback,
  }
}
</script>

<style scoped>

</style>