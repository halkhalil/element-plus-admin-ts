<template>
  <el-icon :size="18" @click="openSettingDrawer">
    <i i="ep-setting"/>
  </el-icon>
</template>
<script lang="ts" setup>
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {openSettingDrawer} = useRootSetting();
</script>