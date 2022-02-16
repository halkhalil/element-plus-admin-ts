<template>
  <div class="flex-col center" @click="openSettingDrawer">
    <icon name="el-setting" size="18"/>
    <SettingDrawer/>
  </div>
</template>
<script lang="ts" setup>
import SettingDrawer from "~/layouts/default/setting/components/SettingDrawer.vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {openSettingDrawer} = useRootSetting();
</script>