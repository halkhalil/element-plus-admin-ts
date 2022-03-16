<template>
  <el-container>
    <el-header height="auto" v-if="getHeaderFixed">
      <LayoutHeader/>
      <LayoutTab v-if="getShowTab"/>
    </el-header>
    <el-main>
      <el-scrollbar view-class="h-full">
        <LayoutHeader v-if="!getHeaderFixed"/>
        <LayoutTab v-if="!getHeaderFixed && getShowTab"/>
        <LayoutContent/>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import {LayoutHeader, LayoutContent, LayoutTab} from '~/layouts/common'
import {useHeaderSetting} from "~/composables/setting/useHeaderSeeting";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {getHeaderFixed} = useHeaderSetting();
const {getShowTab,} = useRootSetting();
</script>