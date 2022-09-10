<template>
  <page-wrapper :title="$route?.meta?.title">
    <el-radio-group v-model="codeMode" size="small" @change="handleChange">
      <el-radio-button label="json">Json数据</el-radio-button>
      <el-radio-button label="html">Html代码</el-radio-button>
      <el-radio-button label="javascript">Javascript代码</el-radio-button>
    </el-radio-group>
    <CodeEditor v-model="codeData" class="mt-2" style="height:100%;min-height: 750px"></CodeEditor>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page";
import {CodeEditor} from '~/components/CodeEditor'
import {jsonData, htmlData, javascriptData} from "./data";
import {ref} from "vue";

const codeMode = ref('json');
const codeData = ref(jsonData);

const handleChange = (v) => {
  switch (v) {
    case 'json':
      codeData.value = jsonData;
      break;
    case 'html':
      codeData.value = htmlData;
      break;
    case 'javascript':
      codeData.value = javascriptData;
      break;
  }
}
</script>

<style lang="scss" scoped>
:deep(.CodeMirror) {
  height: 100%;

  .CodeMirror-scroll {
    min-height: 750px;
  }
}
</style>