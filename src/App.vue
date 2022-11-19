<template>
  <el-config-provider :size="getGlobalSize" :zIndex="3000">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts" setup>
import {useRootSetting} from '~/composables/setting/useRootSeeting'
import {useStore} from "~/store";
import {useI18n} from "vue-i18n";

const {configStore} = useStore();
const {t} = useI18n();

const {getGlobalSize} = useRootSetting();
configStore.setConfig();
</script>