<template>
  <el-scrollbar ref="scrollbarRef" view-class="flex" wrap-class="scroll-wrap"  height="auto" style="height: auto" noresize>
    <div ref="innerRef" class="flex p-1 select-none" style="background-color: var(--el-bg-color)">
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
  innerRef,
  max,
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
:deep(.scroll-wrap) {
  border-bottom: 1px solid var(--el-border-color);
}
</style>
<style lang="scss">
.v-contextmenu {
  margin: 0;
  background-color: var(--el-bg-color) !important;
  z-index: 3000;
  position: absolute;
  font-size: var(--el-font-size-small);
  border: 1px solid var(--el-border-color);

  li.v-contextmenu-item {
    color: var(--el-text-color-primary);

    &:hover {
      background-color: var(--el-menu-hover-bg-color);
    }
  }
}
</style>
