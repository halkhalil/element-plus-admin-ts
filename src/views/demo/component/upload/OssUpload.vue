<template>
  <BasicUpload v-model="files" v-bind="uploadProps" :http-request="httpRequest"></BasicUpload>
</template>

<script lang="ts" setup>
import {BasicUpload} from '~/components/Upload';
import {reactive, ref} from "vue";
import {UploadProps, UploadRawFile, UploadRequestOptions} from "element-plus";
import {fetchOssSign} from "~/api/upload";
import axios from "axios";

const uploadProps = reactive<Partial<UploadProps>>({
  action: import.meta.env.VITE_UPLOAD_URL,
  multiple: true,
  data: {}
});
const files = ref([])
const httpRequest = async (options: UploadRequestOptions) => {
  const {data:{data:{accessid, host, policy, dir, signature,callback}}} = await fetchOssSign();

  const formData = new FormData();
  formData.append('name', options.file.name)
  formData.append('key', `${dir}/${options.file.name}`)
  formData.append('policy', policy)
  formData.append('OSSAccessKeyId', accessid)
  formData.append('success_action_status', '200')
  formData.append('signature', signature)
  formData.append('callback', callback)
  formData.append('file', options.file)
  axios.post(host,formData).then(response=>{
    const file = response.data?.data;
    console.log(file);
  })
}
</script>

<style scoped>

</style>