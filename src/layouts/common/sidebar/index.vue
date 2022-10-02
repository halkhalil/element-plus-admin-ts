<template>
  <el-drawer
    custom-class="drawer-menu"
    v-if="getIsMobile"
    :model-value="!getCollapsed"
    :size="200"
    :with-header="false"
    :destroy-on-close="true"
    direction="ltr"
    @closed="setMenuSetting({collapse: true})">
    <el-scrollbar>
      <LayoutMenu/>
    </el-scrollbar>
  </el-drawer>
  <el-scrollbar v-else>
    <LayoutMenu/>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import LayoutMenu from '~/layouts/common/menu/vertical.vue'
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