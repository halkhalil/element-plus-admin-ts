<template>
  <el-menu v-bind="getMenuSetting" mode="vertical" :default-active="getDefaultActive">
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
const {getShowLogo, getIsMixMode} = useRootSetting();

const menus = cloneDeep(permissionStore.getMenus);
const getMenus = computed(() => {
  if (getIsMixMode.value) { // 混合模式,获取当前一级菜单下的子菜单
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

  //&:not(.el-menu--collapse) {
  //  width: 200px;
  //}
}
</style>