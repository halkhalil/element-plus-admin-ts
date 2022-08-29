<template>
  <el-menu class="menu-container" v-bind="getMenuSetting" :default-active="defaultActive">
    <SidebarLogo class="logo" v-if="getShowSidebarLogo"/>
    <sub-menu v-for="menu in permissionStore.getMenus" :index="menu.path" :key="menu.path" :menu="menu"/>
  </el-menu>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import {useRouter} from 'vue-router';
import SubMenu from "~/layouts/common/menu/SubMenu.vue";
import SidebarLogo from "~/layouts/common/menu/SidebarLogo.vue";
import {useMenuSetting} from "~/composables/setting/useMenuSeeting";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {useStore} from "~/store";

const {currentRoute} = useRouter();
const {permissionStore} = useStore()
const {getMenuSetting} = useMenuSetting();
const {getShowSidebarLogo} = useRootSetting();

const defaultActive = computed(() => {
  const {meta, path} = currentRoute.value;
  return meta?.defaultActive || path;
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