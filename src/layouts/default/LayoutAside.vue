<template>
  <el-container>
    <el-aside width='auto'>
      <LayoutSidebar/>
    </el-aside>
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
  </el-container>
</template>
<script lang="ts" setup>
import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';
import LayoutSidebar from "~/layouts/default/sidebar/index.vue";
import {useHeaderSetting} from "~/composables/setting/useHeaderSeeting";

const {getHeaderFixed} = useHeaderSetting();

</script>