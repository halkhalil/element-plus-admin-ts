<template>
  <div class="page-wrapper w-full min-h-full" :class="$props.class">
    <el-page-header :bind="$props" @back="back" v-if="$props.title" class="!p-5 content-bg">
      <template #breadcrumb>
        <slot name="breadcrumb"></slot>
      </template>
      <template #icon>
        <slot name="icon"></slot>
      </template>
      <template #title>
        <slot name="back"></slot>
      </template>
      <template #content>
        <slot name="title">
          <span class="text-sm font-600">{{ $props.title }}</span>
        </slot>
      </template>
      <template #extra>
        <slot name="extra"></slot>
      </template>
      <template #default>
        <slot name="content"></slot>
      </template>
    </el-page-header>
    <div class="!px-5 pb-5 content-bg"
         ref="contentElRef"
         :style="$props.contentFullHeight ?? {minHeight:getContentHeight+'px'}">
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
  return document.documentElement.clientHeight - top.value - 10;
})

const {back} = useRouter();

</script>

<style lang="scss" scoped>
:deep(.el-page-header__breadcrumb:empty) {
  margin: 0 !important;
}

.content-bg {
  background-color: var(--el-bg-color);
}
</style>