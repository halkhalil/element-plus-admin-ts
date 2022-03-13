<template>
  <el-drawer
    custom-class="drawer-menu"
    v-if="getIsMobile"
    :model-value="!getCollapsed"
    :size="219"
    :with-header="false"
    :destroy-on-close="true"
    direction="ltr"
    @closed="setMenuSetting({collapse: true})">
    <el-scrollbar view-class="scrollbar">
      <LayoutMenu/>
    </el-scrollbar>
  </el-drawer>
  <el-scrollbar v-else view-class="scrollbar">
    <LayoutMenu/>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import LayoutMenu from '~/layouts/common/menu/index.vue'
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {useMenuSetting} from "~/composables/setting/useMenuSeeting";
import {watch} from "vue";

const {getIsMobile} = useRootSetting();
const {getCollapsed, setMenuSetting} = useMenuSetting();

watch(getIsMobile, (val) => {
  setMenuSetting({collapse: val})
})
</script>

<style lang="scss">
.scrollbar {
  height: 100%;
  padding: 0;
}

.drawer-menu {
  .el-drawer__body {
    padding: 0 !important;
  }
}
</style>