<template>
  <el-menu class="menu-container" v-bind="getMenuSetting" :default-active="defaultActive">
    <SidebarLogo class="logo" v-if="getShowSidebarLogo"/>
    <sub-menu v-for="menu in getMenus" :index="menu.path" :key="menu.path" :menu="menu"/>
  </el-menu>
</template>
<script lang="ts" setup>
import SubMenu from "~/layouts/default/menu/SubMenu.vue";
import SidebarLogo from "~/layouts/default/menu/SidebarLogo.vue";
import {useMenuSetting} from "~/composables/setting/useMenuSeeting";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {useLayoutMenus} from "~/layouts/default/menu/useLayoutMenus";
import {computed} from "vue";
import {useRouter} from 'vue-router';

const {currentRoute} = useRouter();
const {getMenus} = useLayoutMenus();
const {getMenuSetting} = useMenuSetting();
const {getShowSidebarLogo} = useRootSetting();

const defaultActive = computed(() => {
  const {meta, path} = currentRoute.value;
  return meta?.activeMenu || path;
})
</script>
<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
}

.menu-container {
  &.el-menu:not(.el-menu--horizontal) {
    height: 100%;

    &:not(.el-menu--collapse) {
      width: 220px;
    }
  }

  &.el-menu.el-menu--horizontal {
    :deep(.el-sub-menu .el-sub-menu__title) {
      height: 49px !important;
      line-height: 49px !important;
    }
  }
}

</style>