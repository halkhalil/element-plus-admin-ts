<template>
  <div class="page-wrapper w-full min-h-full" :class="$props.class">
<!--    <div class="page-header">-->
<!--      <slot name="header">-->
<!--        <div class="flex justify-between">-->
<!--          <div class="page-header-wrap flex items-end">-->
<!--            <slot name="title">-->
<!--              <div class="page-header-title text-xl">{{ title }}</div>-->
<!--            </slot>-->
<!--            <div class="page-header-sub-title text-gray-500 text-xs ml-2 ">-->
<!--              <slot name="sub-title">{{ subTitle }}</slot>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div>-->
<!--            <slot name="extra"></slot>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="page-content text-gray-500">-->
<!--          <slot name="content"> {{ content }}</slot>-->
<!--        </div>-->
<!--      </slot>-->
<!--    </div>-->
    <el-page-header :bind="$props" :title="$route?.meta?.title" content="asdasdasda" :icon="null" class="mx-5">
      <template #extra >
        <el-button>Create</el-button>
        <el-button type="primary">Edit</el-button>
      </template>
<!--      adsadasdasdas-->
    </el-page-header>
    <div class="page-wrapper-content m-2"
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

defineProps({
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

const slotTitle = !!useSlots().title;
const slotSubTitle = !!useSlots().subTitle;

const contentElRef = ref();
const {top} = useElementBounding(contentElRef);
const getContentHeight = computed(() => {
  return document.documentElement.clientHeight - top.value - 10;
})

</script>

<style lang="scss" scoped>
.page-wrapper {
  align-items: stretch;
  font-size: 14px;
  background-color: var(--el-bg-color);

  .page-header {
    flex: 1;
    padding: 16px;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color);


    .page-header-wrap {
      .page-header-title {
        font-weight: bolder;
      }
    }
  }

  .page-content:not(:empty) {
    margin-top: .5rem;
  }

  .content-bg {
    background-color: var(--el-bg-color);
  }
}
</style>