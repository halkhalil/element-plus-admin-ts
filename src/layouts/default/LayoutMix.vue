<template>
  <el-container>
    <el-header height="auto">
      <LayoutHeader/>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <LayoutSidebar/>
      </el-aside>
      <el-container>
        <el-header height="auto" v-if="getShowTagView">
          <TagView></TagView>
        </el-header>
        <el-main>
          <el-scrollbar>
            <LayoutContent/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';
import LayoutSidebar from "~/layouts/default/sidebar/index.vue";
import TagView from '~/layouts/default/tagview/tagView.vue';
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {getShowTagView,} = useRootSetting();
</script>