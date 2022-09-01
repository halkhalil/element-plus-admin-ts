<template>
  <el-menu-item index="/" :route="{path:'/',title:'首页'}" class="!h-50px">
    <el-icon :size="28">
      <img :src="logo ? logo : '/src/assets/logo.png'" class="w-28px h-28px">
    </el-icon>
    <template #title>
      <span class="font-700 !text-base">{{ title }} </span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import {useGlobalSetting} from "~/composables/setting/useGlobalSeeting";

const {title, logo} = useGlobalSetting();
</script>