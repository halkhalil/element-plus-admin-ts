<template>
  <el-menu-item index="/" :route="{path:'/',title:'首页'}">
    <el-icon style="width: 30px;">
      <img :src="logo ? logo : '/src/assets/logo.png'" class="relative -left-1">
    </el-icon>
    <template #title>
      <span class="font-bold">{{ title }} </span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import {useGlobalSetting} from "~/composables/setting/useGlobalSeeting";

const {title, logo} = useGlobalSetting();
</script>