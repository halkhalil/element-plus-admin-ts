<template>
  <div v-loading="getOpenPageLoading && getPageLoading" >
    <PageLayout/>
  </div>
</template>

<script lang="ts" setup>
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import PageLayout from "~/layouts/page/index.vue";

const {getOpenPageLoading} = useTransitionSetting();
const {getPageLoading} = useRootSetting();
</script>
