<template>
  <el-icon :size="18" @click="openSettingDrawer">
    <Icon icon="ep:setting"/>
  </el-icon>
</template>
<script lang="ts" setup>
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {openSettingDrawer} = useRootSetting();
</script>