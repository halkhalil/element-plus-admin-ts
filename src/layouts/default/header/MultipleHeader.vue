<template>
  <div style="height: 50px;"></div>
  <div class="">
    <LayoutHeader/>
    <TagView v-if="getShowTagView"/>
  </div>
</template>

<script lang="ts" setup>
import LayoutHeader from './index.vue'
import TagView from "~/layouts/default/tagview/tagView.vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const {
  getShowTagView,
} = useRootSetting();
</script>

<style lang="scss" scoped>

</style>