<template>
  <el-menu class="h-50px !border-0" v-bind="getMenuSetting" mode="horizontal" :collapse="false"
           :default-active="getDefaultActive">
    <SidebarLogo class="logo" v-if="getShowLogo && getLayoutHorizontal"/>
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
const {getShowLogo, getLayoutHorizontal, getLayoutMix} = useRootSetting();

const menus = cloneDeep(permissionStore.getMenus);
const getMenus = computed(() => {
  if (getLayoutMix.value) { // 混合模式,顶部菜单去掉子集菜单
    return menus.map(menu => {
      menu.children = [];
      return menu;
    })
  }
  return menus;
})

const getDefaultActive = computed(() => {
  const {meta, path, matched} = currentRoute.value;
  return getLayoutMix.value ? matched[0]?.path : (meta?.defaultActive || path);
})
</script>