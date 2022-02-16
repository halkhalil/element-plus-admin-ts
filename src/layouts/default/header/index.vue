<template>
  <el-affix :offset="0" :position="getHeaderFixed ? 'top' : 'bottom' ">
    <div class="header-container flex-row between">
      <!-- left start-->
      <div class="header-left flex-row align-center">
        <Logo v-if="getShowHeaderLogo" class="action-item"/>
        <HeaderTrigger v-if="getShowHeaderTrigger" class="action-item"/>
        <Breadcrumb v-if="getShowBreadcrumb"/>
      </div>
      <!-- left end-->

      <!--  menu start  -->
      <div class="header-menu" v-if="getIsTopMenuMode">
        <LayoutMenu/>
      </div>
      <!--  menu end  -->

      <!--  right start  -->
      <div class="header-right flex-row center align-center ">
        <GitHub class="action-item"/>
        <Notify class="action-item"/>
        <FullScreen class="action-item"/>
        <UserDropdown class="action-item"/>
        <Setting class="action-item"/>
      </div>
      <!--  right end  -->
    </div>

    <TagView v-if="getShowTagView"/>
  </el-affix>
</template>

<script lang="ts" setup>
import Logo from "~/layouts/default/header/components/Logo.vue";
import Notify from "~/layouts/default/header/components/Notify.vue";
import FullScreen from "~/layouts/default/header/components/FullScreen.vue";
import UserDropdown from "~/layouts/default/header/components/UserDropdown.vue";
import Breadcrumb from "~/layouts/default/header/components/Breadcrumb.vue";
import GitHub from "~/layouts/default/header/components/GitHub.vue";
import Setting from "~/layouts/default/setting/index.vue";
import LayoutMenu from '~/layouts/default/menu/index.vue';
import HeaderTrigger from "~/layouts/default/trigger/HeaderTrigger.vue";
import TagView from "~/layouts/default/tagview/tagView.vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {useHeaderSetting} from "~/composables/setting/useHeaderSeeting";

const {
  getShowBreadcrumb,
  getShowHeaderLogo,
  getShowHeaderTrigger,
  getIsTopMenuMode,
  getShowTagView,
} = useRootSetting();

const {getHeaderFixed} = useHeaderSetting();
</script>

<style lang="scss" scoped>
.header-container {
  background: white;
  width: 100%;
  height: 49px;
  padding: 0 0;
  border-bottom: 1px solid #E4E7ED;
  color: #303133;

  .action-item:hover {
    background: #F2F6FC;
  }

  .header-menu {
    width: 100%;
  }

  .action-item {
    height: 49px;
    padding: 0 10px;

    :deep(i) {
      //font-size: 18px;
    }

    cursor: pointer;
  }
}
</style>