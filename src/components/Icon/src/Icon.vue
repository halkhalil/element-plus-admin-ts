<template>
  <Iconify :prefix="$props.prefix" :name="$props.name" :size="$props.size"/>
  <!--  <span ref="elRef" :style="getWrapStyle"></span>-->
</template>

<script lang="ts" setup>
import IconSvg from "./IconSvg.vue";
import {Icon as Iconify} from '@iconify/vue';
import {computed, ref} from "vue";

defineProps({
  mode: {
    type: String,
    default: 'svg',
  },
  prefix: {
    type: String,
    default: '',
  },
  name: String,
  color: String,
  size: {
    type: [String, Number],
    default: 16
  },
  spin: Boolean,
});

// const elRef = ref(null);
// const getWrapStyle = computed(() => {
//   const {size, color} = props;
//   const _size = parseInt(size, 10);
//
//   return {fotSize: `${_size}px`, color: color, display: 'inline-flex'}
// })
</script>

<style scoped>

</style>