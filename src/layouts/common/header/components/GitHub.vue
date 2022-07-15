<template>
  <el-icon :size="18" @click="openGitHub">
    <i i="uit-github-alt"/>
  </el-icon>
</template>
<script lang="ts" setup>
import {openWindow} from "~/utils";
import {Icon} from '@iconify/vue';

const openGitHub = () => {
  openWindow('https://github.com/shiwuhao/element-plus-admin')
}
</script>