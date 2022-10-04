<template>
  <div class="h-full" v-loading="loading">
    <iframe ref="contentElRef" class="w-full border-0" :style="getContentHeight" :src="currentRoute?.meta?.frameSrc"
            @load="hideLoading"></iframe>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useElementBounding} from "@vueuse/core";

const {currentRoute} = useRouter();
const loading = ref(true);
const hideLoading = () => loading.value = false;
const contentElRef = ref<HTMLElement>()
const {top} = useElementBounding(contentElRef);
const getContentHeight = computed(() => {
  return {'minHeight':document.documentElement.clientHeight - top.value -10 + 'px'};
})
</script>
<style lang="scss">
.el-scrollbar__view {
  height: 100%;
}
</style>