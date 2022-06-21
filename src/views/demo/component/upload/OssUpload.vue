<template>
  <BasicUpload v-model="files" v-bind="uploadProps" :http-request="httpRequest"></BasicUpload>
</template>

<script lang="ts" setup>
import {BasicUpload} from '~/components/Upload';
import {reactive, ref} from "vue";
import {UploadProps, UploadRawFile, UploadRequestOptions} from "element-plus";
import {fetchOssSign} from "~/api/upload";
import axios from "~/utils/axios";

const uploadProps = reactive<Partial<UploadProps>>({
  action: import.meta.env.VITE_UPLOAD_URL,
  multiple: true,
  data: {}
});
const files = ref([])
const httpRequest = async (options: UploadRequestOptions) => {
  const {data:{data:{accessid, host, policy, dir, signature}}} = await fetchOssSign();

  const formData = new FormData();
  formData.append('name', options.filename)
  formData.append('key', `${dir}/${options.filename}`)
  formData.append('policy', policy)
  formData.append('OSSAccessKeyId', accessid)
  formData.append('success_action_status', '200')
  formData.append('signature', signature)
  formData.append('file', options.file)
  console.log(host)
  axios.post(host,formData).then(res=>{
    console.log(res);
  })
}
</script>

<style scoped>

</style>