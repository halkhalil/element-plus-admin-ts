<template>
  <div class="z-60 w-full">
    <div class="header-container flex justify-between">
      <div class="header-left inline-flex flex-shrink">
        <HeaderTrigger v-if="getShowHeaderTrigger" class="action"/>
        <Breadcrumb v-if="getShowBreadcrumb && !getShowHorizontalMenu"/>
      </div>

      <div class="w-full" v-if="getShowHorizontalMenu">
        <HorizontalMenu/>
      </div>

      <div class="header-right inline-flex items-center">
        <div class="action flex items-center">
          <Dark/>
        </div>
        <div class="action flex items-center">
          <GitHub/>
        </div>
        <div class="action flex items-center">
          <Notify/>
        </div>
        <div class="action flex items-center">
          <FullScreen/>
        </div>
        <div class="action flex items-center">
          <Setting/>
        </div>
        <div class="action flex items-center">
          <UserDropdown/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from "~/layouts/common/header/components/Logo.vue";
import Dark from "~/layouts/common/header/components/Dark.vue";
import Notify from "~/layouts/common/header/components/Notify.vue";
import FullScreen from "~/layouts/common/header/components/FullScreen.vue";
import UserDropdown from "~/layouts/common/header/components/UserDropdown.vue";
import Breadcrumb from "~/layouts/common/header/components/Breadcrumb.vue";
import GitHub from "~/layouts/common/header/components/GitHub.vue";
import Setting from "~/layouts/common/setting/index.vue";
import HorizontalMenu from '~/layouts/common/menu/horizontal.vue';
import HeaderTrigger from "~/layouts/common/trigger/HeaderTrigger.vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {
  getShowBreadcrumb,
  getShowHeaderLogo,
  getShowHeaderTrigger,
  getShowHorizontalMenu,
} = useRootSetting();
</script>

<style lang="scss" scoped>
.header-container {
  background: var(--el-bg-color);
  width: 100%;
  height: 49px;
  padding: 0 0;
  border-bottom: 1px solid var(--el-border-color);
  color: #303133;

  .action:hover {
    background: var(--el-backtop-text-color);
  }
  .action {
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    color: var(--el-text-color-primary);
  }
}
</style>