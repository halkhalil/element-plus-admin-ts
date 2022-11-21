<template>
  <el-menu-item :index="menu.path" :route="menu">
    <el-icon v-if="menu.icon" :size="18">
      <Icon :icon="menu.icon" class="mr-1"/>
    </el-icon>
    <template #title>{{ t(menu.title) }}</template>
  </el-menu-item>
</template>
<script lang="ts" setup>
import {useLocale} from "~/composables/useLocale";

defineProps({
  menu: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: '',
  }
});

const {t} = useLocale();
</script>