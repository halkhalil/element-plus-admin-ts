<template>
  <el-scrollbar ref="scrollbarRef" wrap-class="scroll-wrap" height="auto" style="height: auto" noresize>
    <div class="flex p-1 select-none">
      <el-tag
        class="mx-0.5 cursor-pointer font-bold"
        :ref="(el) => el && getTabRefs.push(el)"
        v-for="item in getVisitedTabs"
        :key="item.path"
        :route="item"
        :type="tabIsActive(item) ? '' : 'info'"
        :closable="!(item.meta && item.meta.affix)"
        :effect="tabIsActive(item) ? 'dark' : 'light'"
        @close="closeTab(item)"
        @click="goTab(item)"
        @contextmenu.prevent="getSelectTab = item"
        v-contextmenu:contextmenu
      >
        {{ item.title }}
      </el-tag>
    </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="refreshTab(getSelectTab)">刷新</v-contextmenu-item>
      <v-contextmenu-item v-if="!tabIsAffix(getSelectTab)" @click="closeTab(getSelectTab)">关闭</v-contextmenu-item>
      <v-contextmenu-item @click="closeOtherTab(getSelectTab)">关闭其他</v-contextmenu-item>
      <v-contextmenu-item @click="closeAllTab(getSelectTab)">关闭所有</v-contextmenu-item>
    </v-contextmenu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import {useTab} from "~/layouts/common/tab/useTab";

const {
  scrollbarRef,
  getTabRefs,
  getSelectTab,
  getVisitedTabs,
  goTab,
  closeTab,
  refreshTab,
  closeOtherTab,
  closeAllTab,
  tabIsActive,
  tabIsAffix
} = useTab();
</script>
<style lang="scss" scoped>
.scroll-wrap {
  border-bottom: 1px solid var(--el-border-color);
}

.v-contextmenu {
  margin: 0;
  background-color: var(--el-bg-color) !important;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid var(--el-border-color);
  //box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

  li.v-contextmenu-item {
    //font-size: 12px;
    //margin: 0;
    //padding: 5px 16px;
    //cursor: pointer;
    color: var(--el-text-color-primary);

    &:hover {
      background-color: var(--el-menu-hover-bg-color);
    }
  }
}
</style>
