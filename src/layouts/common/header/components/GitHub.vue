<template>
  <el-icon :size="18" @click="openGitHub">
    <i i="iconoir-github"/>
  </el-icon>
</template>
<script lang="ts" setup>
import {openWindow} from "~/utils";
import {Icon} from '@iconify/vue';

const openGitHub = () => {
  openWindow('https://github.com/shiwuhao/element-plus-admin')
}
</script>