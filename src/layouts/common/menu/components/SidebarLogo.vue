<template>
  <el-menu-item index="0" class="!h-50px">
    <img :src="logo ? logo : '/src/assets/logo.png'" class="w-35px h-35px ml--6px">
    <span class="font-700 !text-base ml-2">{{ title }} </span>
  </el-menu-item>
</template>

<script lang="ts" setup>
import {useGlobalSetting} from "~/composables/setting/useGlobalSeeting";

const {title, logo} = useGlobalSetting();
</script>