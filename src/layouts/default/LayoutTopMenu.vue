<template>
  <el-container class="container">
    <el-main class="main">
      <el-header height="auto">
        <LayoutHeader/>
      </el-header>
      <LayoutContent class="content"/>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';
</script>

<style lang="scss" scoped>
.el-container, .el-header, .el-main, .el-aside {
  padding: 0;
}

.container {
  width: 100%;
  height: 100vh;
  padding: 0 0;
}
</style>