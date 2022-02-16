<template>
  <div class="flex-col center align-center" @click="toggle">
    <icon :name="!isFullscreen ? 'el-expend' : 'el-compress'" size="18"/>
  </div>
</template>
<script lang="ts" setup>
import {useFullscreen} from '@vueuse/core';

const {toggle, isFullscreen} = useFullscreen();
</script>
