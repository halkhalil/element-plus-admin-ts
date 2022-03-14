<template>
  <el-container>
    <el-aside width='auto'>
      <LayoutSidebar/>
    </el-aside>
    <el-container>
      <el-header height="auto" v-if="getHeaderFixed">
        <LayoutHeader/>
        <LayoutTagView v-if="getShowTagView"/>
      </el-header>
      <el-main>
        <el-scrollbar>
          <LayoutHeader v-if="!getHeaderFixed"/>
          <LayoutTagView v-if="!getHeaderFixed && getShowTagView"/>
          <LayoutContent/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import {LayoutSidebar, LayoutHeader, LayoutContent, LayoutTagView} from '~/layouts/common'
import {useHeaderSetting} from "~/composables/setting/useHeaderSeeting";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {getHeaderFixed} = useHeaderSetting();
const {getShowTagView} = useRootSetting()
</script>