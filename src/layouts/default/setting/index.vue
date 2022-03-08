<template>
  <div @click="openSettingDrawer">
    <icon name="el-setting" size="15"/>
    <SettingDrawer/>
  </div>
</template>
<script lang="ts" setup>
import SettingDrawer from "~/layouts/default/setting/components/SettingDrawer.vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {openSettingDrawer} = useRootSetting();
</script>