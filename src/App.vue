<template>
  <el-config-provider :size="getGlobalSize" :zIndex="3000">
    <router-view/>
  </el-config-provider>
</template>

<script setup lang="ts">
import {configItemsApi} from '~/api/configs'
import {useRootSetting} from '~/composables/setting/useRootSeeting'
import store from "~/store";

const {getGlobalSize} = useRootSetting();
configItemsApi().then((response) => {
  store.commit('config/setConfig', response.data.data);
});
</script>