<template>
  <el-config-provider :size="getGlobalSize" :locale="getElementLocale" :zIndex="3000">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts" setup>
import {useRootSetting} from '~/composables/setting/useRootSeeting'
import {useStore} from "~/store";
import {useLocale} from "~/composables/useLocale";

const {configStore} = useStore();
const {getElementLocale} = useLocale();

const {getGlobalSize} = useRootSetting();
configStore.setConfig();
</script>