<template>
  <el-menu v-bind="getMenuSetting" mode="vertical" class="!min-h-screen" :default-active="getDefaultActive">
    <SidebarLogo class="logo" v-if="getShowLogo"/>
    <sub-menu v-for="menu in getMenus" :index="menu.path" :key="menu.path" :menu="menu"/>
  </el-menu>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import {useRouter} from 'vue-router';
import SubMenu from "~/layouts/common/menu/components/SubMenu.vue";
import SidebarLogo from "~/layouts/common/menu/components/SidebarLogo.vue";
import {useMenuSetting} from "~/composables/setting/useMenuSeeting";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {useStore} from "~/store";
import {cloneDeep} from "lodash-es";

const {currentRoute} = useRouter();
const {permissionStore} = useStore()
const {getMenuSetting} = useMenuSetting();
const {getShowLogo, getLayoutMix} = useRootSetting();

const menus = cloneDeep(permissionStore.getMenus);
const getMenus = computed(() => {
  if (getLayoutMix.value) { // 混合模式,获取当前一级菜单下的子菜单
    const currentMenu = menus.find(menu => menu.path === currentRoute.value?.matched[0]?.path);
    return currentMenu?.children || currentMenu;
  }
  return menus;
})

const getDefaultActive = computed(() => {
  const {meta, path} = currentRoute.value;
  return meta?.defaultActive || path;
})

</script>
<style lang="scss" scoped>
.el-menu:not(.el-menu--horizontal) {
  height: 100%;

  &:not(.el-menu--collapse) {
    width: 200px;
  }

  //--el-menu-bg-color: #1d1e1f;
  //--el-menu-text-color: #E5EAF3;
  //--el-menu-hover-bg-color: #18222c;
  ////--el-menu-active-color:red;
  //--el-menu-bg-color-overlay: #1d1e1f;
}
</style>