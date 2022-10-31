<template>
  <el-config-provider :size="getGlobalSize" :zIndex="3000">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts" setup>
import {useRootSetting} from '~/composables/setting/useRootSeeting'
import {useStore} from "~/store";

const {configStore} = useStore();

const {getGlobalSize} = useRootSetting();
configStore.setConfig();
</script>