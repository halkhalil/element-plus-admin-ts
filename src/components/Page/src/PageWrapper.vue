<template>
  <div class="page-wrapper w-full min-h-full content-bg" :class="$props.class">
    <div class="not-empty:p-3">
      <slot name="header">
        <el-page-header :bind="$props" @back="back" v-if="$props.title">
          <template #breadcrumb v-if="slots.breadcrumb">
            <slot name="breadcrumb"></slot>
          </template>
          <template #icon v-if="slots.icon">
            <slot name="icon"></slot>
          </template>
          <template #title v-if="slots.extrbacka">
            <slot name="back"></slot>
          </template>
          <template #content>
            <slot name="title">
              <span class="text-sm font-600">{{ t($props.title) }}</span>
            </slot>
          </template>
          <template #extra v-if="slots.extra">
            <slot name="extra"></slot>
          </template>
          <template #default v-if="slots.content">
            <slot name="content"></slot>
          </template>
        </el-page-header>
      </slot>
    </div>
    <div class="!p-3 !pt-0"
         ref="contentElRef"
         :style="[$props.contentFullHeight ? getContentHeight : '']">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref, computed} from "vue";
import {useElementBounding} from '@vueuse/core'
import {useSlots} from "vue";
import {useRouter} from "vue-router";
import {useLocale} from "~/composables/useLocale";

defineProps({
  showHeader: Boolean,
  title: {
    type: String,
    default: '',
  },
  subTitle: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  contentBackground: {
    type: Boolean,
    default: false,
  },
  contentFullHeight: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  }
})

const contentElRef = ref();
const {top} = useElementBounding(contentElRef);
const getContentHeight = computed(() => {
  return {'minHeight': document.documentElement.clientHeight - top.value - 20 + 'px'};
})

const {back} = useRouter();

const slots = useSlots();

const {t} = useLocale()
</script>

<style lang="scss" scoped>
:deep(.el-page-header__breadcrumb:empty) {
  margin: 0 !important;
}

:deep(.el-page-header__main) {
  padding-top: 10px;
}

.content-bg {
  background-color: var(--el-bg-color);
}
</style>