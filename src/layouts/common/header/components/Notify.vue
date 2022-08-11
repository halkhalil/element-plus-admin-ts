<template>
  <el-badge type="danger" is-dot style="height: 18px;">
    <el-icon :size="18" ref="buttonRef" v-click-outside="onClickOutside">
      <Icon icon="clarity:notification-line"/>
    </el-icon>
  </el-badge>
  <el-popover width="500" ref="popoverRef" :virtual-ref="buttonRef" trigger="click" virtual-triggering>
    <el-tabs v-model="activeName">
      <el-tab-pane label="通知(3)" name="first">
        <div style="height: 300px;width: 300px;">
          通知(3)
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息(4)" name="second">
        <div style="height: 300px;width: 300px;">消息(4)</div>
      </el-tab-pane>
      <el-tab-pane label="待办(5)" name="third">
        <div style="height: 300px;width: 300px;">待办(5)</div>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>
<script lang="ts" setup>
import {ref, unref} from 'vue'
import {ClickOutside as vClickOutside} from 'element-plus'

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const visible = ref(false);
const activeName = ref('first');
</script>