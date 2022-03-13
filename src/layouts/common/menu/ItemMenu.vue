<template>
  <el-menu-item :index="menu.path" :route="menu">
    <el-icon v-if="menu.icon">
      <icon :name="menu.icon" :size="18" class="mr-1"/>
    </el-icon>
    <template #title>{{ menu.title }}</template>
  </el-menu-item>
</template>
<script lang="ts" setup>
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
</script>