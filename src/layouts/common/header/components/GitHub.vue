<template>
  <div class="">
    <icon name="el-github" size="15" @click="openGitHub"/>
  </div>
</template>
<script lang="ts" setup>
import {openWindow} from "~/utils";

const openGitHub = () => {
  openWindow('https://github.com/shiwuhao/element-plus-admin')
}
</script>