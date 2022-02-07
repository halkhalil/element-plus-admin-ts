<template>
  <iframe
    :src="frameSrc"
    :class="`${prefixCls}__main`"
    ref="frameRef"
    @load="hideLoading"
  ></iframe>
</template>

<script lang="ts" setup>
import { ref, unref, computed } from 'vue';
defineProps({
  frameSrc: String,
});

const loading = ref(true);
const topRef = ref(50);
const heightRef = ref(window.innerHeight);
const frameRef = ref<HTMLFrameElement>();

</script>

<style scoped>

</style>