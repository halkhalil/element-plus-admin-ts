<template>
  <el-container ref="containerElRef">
    <el-aside width='auto'>
      <LayoutSidebar/>
    </el-aside>
    <el-main class="main">
      <!--      <el-header class="header" ref="headerElRef">-->
      <LayoutHeader ref="headerElRef"/>
      <!--      </el-header>-->

      <LayoutContent ref="contentElRef" :style="{height:contentHeight+'px'}"/>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';
import LayoutSidebar from "~/layouts/default/sidebar/index.vue";
import {useLayout} from "~/layouts/default/useLayout";

const {headerElRef, containerElRef, contentHeight} = useLayout();

</script>

<style lang="scss" scoped>
.el-container, .el-header, .el-main, .el-aside {
  padding: 0;
}
</style>