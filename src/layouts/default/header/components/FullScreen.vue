<template>
  <div @click="toggle">
    <icon :name="!isFullscreen ? 'el-expend' : 'el-compress'" size="15"/>
  </div>
</template>
<script lang="ts" setup>
import {useFullscreen} from '@vueuse/core';

const {toggle, isFullscreen} = useFullscreen();
</script>
