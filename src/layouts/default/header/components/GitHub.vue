<template>
  <div class="flex-col center align-center">
    <icon name="el-github" size="18" @click="openGitHub"/>
  </div>
</template>
<script lang="ts" setup>
import {openWindow} from "~/utils";

const openGitHub = () => {
  openWindow('https://github.com/shiwuhao/element-plus-admin')
}
</script>