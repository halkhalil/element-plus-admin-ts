<template>
  <div class="flex justify-center items-center">
    <div class="flex items-center w-max h-max ml-1.4">
      <img :src="logo ? logo : '/src/assets/logo.png'" class="w-35px h-35px ml--6px">
      <span class="font-700 !text-base ml-2">{{ title }} </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useGlobalSetting} from "~/composables/setting/useGlobalSeeting";

const {title, logo} = useGlobalSetting();
</script>