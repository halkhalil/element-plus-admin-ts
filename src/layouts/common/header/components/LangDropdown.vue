<template>
  <el-dropdown size="small" @command="toggleLocale">
    <el-icon :size="18">
      <Icon icon="ion:language-outline"/>
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu class="fontsize-ensurer">
        <el-dropdown-item command="zh_CN" :class="getLocale === 'zh_CN' ? 'active' : ''">简体中文</el-dropdown-item>
        <el-dropdown-item command="en_US" :class="getLocale === 'en_US' ? 'active' : ''">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import {useLocale} from "~/composables/useLocale";

const {changeLocale, getLocale} = useLocale()

const toggleLocale = async (lang) => {
  if (getLocale.value == lang) return ;
  await changeLocale(lang);
  location.reload();
}

</script>
<style lang="scss" scoped>
:deep(.el-dropdown-menu__item.active:not(.is-disabled)) {
  background-color: var(--el-dropdown-menuItem-hover-fill);
  color: var(--el-dropdown-menuItem-hover-color);
}
</style>