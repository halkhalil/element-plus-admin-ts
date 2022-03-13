<template>
  <el-container>
    <el-header height="auto" v-if="getHeaderFixed">
      <LayoutHeader/>
    </el-header>
    <el-main>
      <el-scrollbar>
        <LayoutHeader v-if="!getHeaderFixed"/>
        <LayoutContent/>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import {LayoutHeader, LayoutContent} from '~/layouts/common'
import {useHeaderSetting} from "~/composables/setting/useHeaderSeeting";

const {getHeaderFixed} = useHeaderSetting();
</script>