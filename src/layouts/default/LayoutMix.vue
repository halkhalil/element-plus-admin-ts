<template>
  <el-container class="container">
    <el-header height="auto">
      <LayoutHeader/>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <LayoutSidebar/>
      </el-aside>
      <el-container>
        <el-header height="auto">
          <TagView/>
        </el-header>
        <el-main class="main">
          <LayoutContent/>
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
</script>

<style lang="scss" scoped>
.el-container, .el-header, .el-main, .el-aside {
  padding: 0;
}

.container {
  width: 100%;
  height: 100vh;
  padding: 0 0;

  .main {
    height: 100vh;
    padding-bottom: 50px;
  }
}
</style>