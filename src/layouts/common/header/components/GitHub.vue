<template>
  <el-icon :size="18" @click="openGitHub">
    <Icon icon="iconoir:github"/>
  </el-icon>
</template>
<script lang="ts" setup>
import {openWindow} from "~/utils";

const openGitHub = () => {
  openWindow('https://github.com/shiwuhao/element-plus-admin')
}
</script>