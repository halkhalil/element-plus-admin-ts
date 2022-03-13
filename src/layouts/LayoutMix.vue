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
          <LayoutTagView/>
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
import {LayoutSidebar, LayoutHeader, LayoutContent, LayoutTagView} from '~/layouts/common'
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {getShowTagView,} = useRootSetting();
</script>