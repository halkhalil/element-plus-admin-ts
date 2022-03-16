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
        <el-header height="auto" v-if="getShowTab">
          <LayoutTab/>
        </el-header>
        <el-main>
          <el-scrollbar view-class="h-full">
            <LayoutContent/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import {LayoutSidebar, LayoutHeader, LayoutContent, LayoutTab} from '~/layouts/common'
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {getShowTab,} = useRootSetting();
</script>