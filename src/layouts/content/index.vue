<template>
  <div v-loading="getOpenPageLoading && getPageLoading">
    <Content/>
  </div>
</template>

<script lang="ts" setup>
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import Content from "~/layouts/content/Content.vue";

const {getOpenPageLoading} = useTransitionSetting();
const {getPageLoading} = useRootSetting();
</script>
