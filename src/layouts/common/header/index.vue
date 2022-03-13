<template>
  <div class="z-60 w-full">
    <div class="header-container flex justify-between">
      <div class="header-left inline-flex flex-shrink">
        <Logo v-if="getShowHeaderLogo" class="action"/>
        <HeaderTrigger v-if="getShowHeaderTrigger" class="action"/>
        <Breadcrumb v-if="getShowBreadcrumb"/>
      </div>

      <div class="header-menu" v-if="getIsTopMenuMode">
        <LayoutMenu/>
      </div>

      <div class="header-right inline-flex items-center">
        <div class="action flex-col-center">
          <GitHub/>
        </div>
        <div class="action flex-col-center">
          <Notify/>
        </div>
        <div class="action flex-col-center">
          <FullScreen/>
        </div>
        <div class="action flex-col-center">
          <Setting/>
        </div>
        <div class="action flex-col-center">
          <UserDropdown/>
        </div>
      </div>
    </div>

    <TagView v-if="getShowTagView && !getIsMixMode"/>
  </div>
</template>

<script lang="ts" setup>
import Logo from "~/layouts/common/header/components/Logo.vue";
import Notify from "~/layouts/common/header/components/Notify.vue";
import FullScreen from "~/layouts/common/header/components/FullScreen.vue";
import UserDropdown from "~/layouts/common/header/components/UserDropdown.vue";
import Breadcrumb from "~/layouts/common/header/components/Breadcrumb.vue";
import GitHub from "~/layouts/common/header/components/GitHub.vue";
import Setting from "~/layouts/common/setting/index.vue";
import LayoutMenu from '~/layouts/common/menu/index.vue';
import HeaderTrigger from "~/layouts/common/trigger/HeaderTrigger.vue";
import TagView from "~/layouts/common/tagview/index.vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {
  getShowBreadcrumb,
  getShowHeaderLogo,
  getShowHeaderTrigger,
  getIsTopMenuMode,
  getShowTagView,
  getIsMixMode,
} = useRootSetting();
</script>

<style lang="scss" scoped>
.header-container {
  background: white;
  width: 100%;
  height: 49px;
  padding: 0 0;
  border-bottom: 1px solid #E4E7ED;
  color: #303133;

  .action:hover {
    background: #F2F6FC;
  }

  .header-menu {
    width: 100%;
  }

  .action {
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
  }
}
</style>