<template>
  <el-affix :offset="0" :position="getHeaderFixed ? 'top' : 'bottom' ">
    <div class="header-container flex justify-between">
      <!-- left start-->
      <div class="header-left inline-flex flex-shrink">
        <Logo v-if="getShowHeaderLogo" class="action"/>
        <HeaderTrigger v-if="getShowHeaderTrigger" class="action"/>
        <Breadcrumb v-if="getShowBreadcrumb"/>
      </div>
      <!-- left end-->

      <!--  menu start  -->
      <div class="header-menu" v-if="getIsTopMenuMode">
        <LayoutMenu/>
      </div>
      <!--  menu end  -->

      <!--  right start  -->
      <div class="header-right inline-flex items-center">
        <div class="action flex-col-center"><GitHub/></div>
        <div class="action flex-col-center"><Notify/></div>
        <div class="action flex-col-center"><FullScreen/></div>
        <div class="action flex-col-center"><Setting/></div>
        <div class="action flex-col-center"><UserDropdown/></div>
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