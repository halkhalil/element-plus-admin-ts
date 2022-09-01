<template>
  <div class="page-wrapper w-full min-h-full" :class="$props.class">
    <el-page-header :bind="$props" class="mx-5" @back="back" v-if="$props.showHeader">
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
    <div class="page-wrapper-content m-3"
         ref="contentElRef"
         :class="{'content-bg' :$props.contentBackground}"
         :style="$props.contentFullHeight ?? {minHeight:getContentHeight+'px'}">
      <slot></slot>
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
//.page-wrapper {
//
//  .page-content:not(:empty) {
//    margin-top: .5rem;
//  }
//
//  .content-bg {
//    background-color: var(--el-bg-color);
//  }
//}
</style>