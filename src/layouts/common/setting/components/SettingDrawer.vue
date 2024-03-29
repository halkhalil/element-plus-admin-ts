<template>
  <el-drawer
    custom-class="drawer-container"
    :model-value="getShowSettingDrawer"
    direction="rtl"
    :size="280"
    :with-header="false"
    :show-close="false"
    :append-to-body="true"
    @closed="closedSettingDrawer"
  >
    <el-scrollbar>
      <div class="drawer-body">
        <el-form size="small">
          <el-divider>导航栏模式</el-divider>
          <div class="flex justify-between">
            <el-tooltip v-for="(item,index) in menuTypes"
                        :key="index"
                        effect="dark"
                        :content="item.title"
                        placement="top-start">
              <div class="" @click="toggleLayout(item.type)">
                <div class="flex justify-center items-center" :class="['menu-type',`menu-type--${item.type}`]">
                  <el-icon size="20px" color="var(--el-color-primary)" v-if="item.type === getLayout">
                    <Icon icon="ep:select"/>
                  </el-icon>
                </div>
              </div>
            </el-tooltip>
          </div>

          <el-divider>主题色</el-divider>
          <div class="flex justify-between">
            <template v-for="theme in getThemes">
              <div class="h-20px w-20px border-1 m-1 cursor-pointer flex justify-center items-center"
                   :style="{backgroundColor: theme.color}"
                   @click="changeTheme(theme.theme)">
                <el-icon v-if="theme.theme === getTheme" color='var(--el-color-primary)'>
                  <Icon icon="ep:select"/>
                </el-icon>
              </div>
            </template>
          </div>

          <el-divider>内容区域</el-divider>
          <div class="drawer-item">
            <span>dark</span>
            <el-switch :model-value="isDark"
                       :active-value="true"
                       :inactive-value="false"
                       class="drawer-switch"
                       @change="toggleDark"/>
          </div>
          <div class="drawer-item">
            <span>标签页</span>
            <el-switch :model-value="getEnableTab" class="drawer-switch"
                       @change="toggleEnableTab"/>
          </div>

          <div class="drawer-item">
            <span>固定Header</span>
            <el-switch :model-value="getHeaderFixed" class="drawer-switch"
                       @change="toggleHeaderFixed"/>
          </div>

          <div class="drawer-item">
            <span>侧边栏Logo</span>
            <el-switch :model-value="getShowLogo" class="drawer-switch" @change="toggleLogo"/>
          </div>
          <div class="drawer-item">
            <span>面包屑导航</span>
            <el-switch :model-value="getShowBreadcrumb" class="drawer-switch"
                       @change="toggleBreadcrumb"/>
          </div>
          <div class="drawer-item">
            <span>布局大小</span>
            <el-select :model-value="getGlobalSize" style="width: 120px"
                       @change="toggleElementSize($event)">
              <el-option v-for="value in SizeEnum"
                         :key="value"
                         :label="value"
                         :value="value"></el-option>
            </el-select>
          </div>

          <el-divider>动画</el-divider>
          <div class="drawer-item">
            <span>顶部进度条</span>
            <el-switch :model-value="getOpenNProgress" class="drawer-switch"
                       @change="toggleOpenNProgress"/>
          </div>
          <div class="drawer-item">
            <span>切换Loading</span>
            <el-switch :model-value="getOpenPageLoading" class="drawer-switch"
                       @change="toggleOpenPageLoading"/>
          </div>
          <div class="drawer-item">
            <span>切换动画</span>
            <el-switch :model-value="getEnableTransition" class="drawer-switch"
                       @change="toggleEnableTransition"/>
          </div>
          <div class="drawer-item">
            <span>动画类型</span>
            <el-select :model-value="getBasicTransition" style="width: 120px"
                       @change="setBasicTransition($event)">
              <el-option v-for="value in TransitionEnum"
                         :key="value"
                         :label="value"
                         :value="value"></el-option>
            </el-select>
          </div>
        </el-form>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>
<script lang="ts" setup>
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {useHeaderSetting} from "~/composables/setting/useHeaderSeeting";
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting";
import {useTabSetting} from "~/composables/setting/useTabSeeting";
import {SizeEnum, TransitionEnum} from '~/enums/app';
import {menuTypes} from './menu'
import {useDark, useToggle} from '@vueuse/core'
import {useThemeSetting} from "~/composables/setting/useThemeSeeting";

const {
  getShowLogo,
  getShowBreadcrumb,
  getShowSettingDrawer,
  getLayout,
  getGlobalSize,
  closedSettingDrawer,
  toggleLogo,
  toggleBreadcrumb,
  toggleLayout,
  toggleElementSize,
} = useRootSetting();

const isDark = useDark()
const toggleDark = useToggle(isDark);

const {getHeaderFixed, toggleHeaderFixed} = useHeaderSetting();
const {
  getOpenNProgress,
  toggleOpenNProgress,
  getOpenPageLoading,
  toggleOpenPageLoading,
  getEnableTransition,
  toggleEnableTransition,
  setBasicTransition,
  getBasicTransition,
} = useTransitionSetting();

const {getEnableTab, toggleEnableTab} = useTabSetting();
const {getTheme, getThemes, changeTheme} = useThemeSetting();


</script>
<style lang="scss">


.drawer-container {
  .el-drawer__body {
    padding: 0 !important;
  }
}

.drawer-body {
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item {
    color: var(--el-text-color-primary);
    font-size: var(--el-font-size-base);
    padding: 8px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>