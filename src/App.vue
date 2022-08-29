<template>
  <el-config-provider :size="getGlobalSize" :zIndex="3000">
    <router-view/>
  </el-config-provider>
</template>

<script setup lang="ts">
import {useRootSetting} from '~/composables/setting/useRootSeeting'
import {useStore} from "~/store";

const {configStore} = useStore();

const {getGlobalSize} = useRootSetting();
configStore.setConfig();
</script>