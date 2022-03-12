<template>
  <div @click="openSettingDrawer">
    <icon name="el-setting" size="15"/>
  </div>
</template>
<script lang="ts" setup>
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {openSettingDrawer} = useRootSetting();
</script>