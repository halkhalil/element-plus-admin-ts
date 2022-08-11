<template>
  <el-icon :size="18" @click="toggle">
    <Icon :icon="!isFullscreen ? 'bytesize:fullscreen' : 'bytesize:fullscreen-exit'"/>
  </el-icon>
</template>
<script lang="ts" setup>
import {useFullscreen} from '@vueuse/core';

const {toggle, isFullscreen} = useFullscreen();
</script>
