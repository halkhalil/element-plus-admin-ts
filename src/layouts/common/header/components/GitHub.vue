<template>
  <el-icon :size="20" @click="openGitHub">
    <!--    <Icon icon="charm:github" />-->
    <!--    <Icon icon="uit:github-alt" />-->
    <i inline-flex i="uit:github-alt"/>
  </el-icon>
</template>
<script lang="ts" setup>
import {openWindow} from "~/utils";
import {Icon} from '@iconify/vue';

const openGitHub = () => {
  openWindow('https://github.com/shiwuhao/element-plus-admin')
}
</script>