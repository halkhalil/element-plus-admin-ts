<template>
  <PageWrapper :title="$route.meta['title']" content-full-height content-background>
    <div class="mt-2">
      <Markdown ref="markdownRef" v-model="markdownData" :options="options"></Markdown>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page";
import {Markdown} from '~/components/Markdown'
import {markdownData} from "./data";
import {ref} from "vue";

const options = ref({
  height: '100%',
  upload: {
    url: 'https://security-company.runhub.cn/backend/uploads',
    format: (files, responseText) => {
      const response = JSON.parse(responseText)
      const returnData = {code: 0, msg: '', data: {errFiles: [], succMap: {url: response.files[0]['url']}}}
      return JSON.stringify(returnData);
    },
  }
})
</script>

<style lang="scss" scoped>
:deep(.CodeMirror) {
  height: 100%;

  .CodeMirror-scroll {
    min-height: 750px;
  }
}
</style>