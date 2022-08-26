<template>
  <el-config-provider :size="getGlobalSize" :zIndex="3000">
    <router-view/>
  </el-config-provider>
</template>

<script setup lang="ts">
import {useRootSetting} from '~/composables/setting/useRootSeeting'
import {useConfigStore} from "~/store/modules/config";
import {useUserStore} from "~/store/modules/user";

const {getGlobalSize} = useRootSetting();
useConfigStore().setConfig();
useUserStore().setToken('dsadsa');
</script>