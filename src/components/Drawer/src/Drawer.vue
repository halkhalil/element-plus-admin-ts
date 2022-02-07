<template>
  <div class="drawer-container">
    <el-drawer v-bind="$props" :size="getIsMobile ? '100%' : $props.size" @close="drawerClose">
      <template #title>
        <div class="drawer__title">
          <slot name="title">{{ $props.title }}</slot>
        </div>
      </template>
      <template #default>
        <div class="drawer__content">
          <slot name="default"></slot>
        </div>
        <div class="drawer__footer">
          <slot name="footer"></slot>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {props as _props} from './props'

const props = defineProps(_props);
const {getIsMobile} = useRootSetting();
const emit = defineEmits(['update:modelValue']);
const drawerClose = () => emit('update:modelValue', false);
</script>

<style lang="scss" scoped>
.drawer-container {
  :deep(.el-drawer) {
    .drawer__title {
      font-weight: bolder;
    }

    .el-drawer__header {
      padding: 10px;
      margin-bottom: 0;
      border-bottom: 1px solid #EEEEEF;
    }

    .el-drawer__body {
      overflow: scroll;
    }


    .drawer__footer:not(:empty) {
      z-index: 1001;
      background-color: white;
      position: absolute;
      bottom: 0;
      right: 0;
      text-align: right;
      padding-right: 20px;
      height: 45px;
      line-height: 45px;
      width: 100%;
      border-top: 1px solid #EEEEEF;
    }
  }
}
</style>