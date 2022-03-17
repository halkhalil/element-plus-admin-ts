<template>
  <div class="tag-tab bg-white">
    <el-scrollbar ref="scrollbarRef">
      <div class="scroll-container">
        <el-tag
          class="tag-item"
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
    </el-scrollbar>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="refreshTab(getSelectTab)">刷新</v-contextmenu-item>
      <v-contextmenu-item v-if="!tabIsAffix(getSelectTab)" @click="closeTab(getSelectTab)">关闭</v-contextmenu-item>
      <v-contextmenu-item @click="closeOtherTab(getSelectTab)">关闭其他</v-contextmenu-item>
      <v-contextmenu-item @click="closeAllTab(getSelectTab)">关闭所有</v-contextmenu-item>
    </v-contextmenu>
  </div>
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
.tag-tab {
  border-bottom: 1px solid var(--el-border-color-light);
  text-align: left;
  padding: 2px 10px;

  .scroll-container {
    background: white;
    line-height: normal;

    .tag-item {
      margin: 0 2px;
      cursor: pointer;
      font-weight: bolder;
      user-select: none;
    }
  }
}

.v-contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

  li.v-contextmenu-item {
    font-size: 12px;
    margin: 0;
    padding: 5px 16px;
    cursor: pointer;

    &:hover {
      background: #409EFF;
    }
  }
}
</style>
