<template>
  <div class="flex justify-center items-center">
    <div class="flex items-center w-max h-max ml-1.4">
      <img class="h-6" :src="logo">
      <span class="font-bold ml-1">{{ title }} </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useGlobalSetting} from "~/composables/setting/useGlobalSeeting";

const {title, logo} = useGlobalSetting();
</script>