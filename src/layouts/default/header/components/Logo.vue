<template>
  <div class="flex-col-center">
    <div class="flex items-center w-max h-max">
      <img class="h-10" :src="logo">
      <span class="font-bold ml-1">{{ title }} </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useGlobalSetting} from "~/composables/setting/useGlobalSeeting";

const {title, logo} = useGlobalSetting();
</script>