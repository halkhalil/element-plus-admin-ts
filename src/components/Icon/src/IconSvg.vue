<template>
  <svg class="icon" aria-hidden="true" :style="getWrapStyle">
    <use :xlink:href="symbolId"></use>
  </svg>
</template>

<script lang="ts" setup>
import {computed, toRefs} from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    required: true,
    default: 16,
  },
  spin: {
    type: Boolean,
    default: false,
  },
});

const {prefix, name, size} = toRefs(props);
const symbolId = computed(() => `#${prefix.value}${name.value}`)
const getWrapStyle = computed(() => {
  const s = `${size.value}`.replace('px', '') + 'px';
  return {width: s, height: s};
})
</script>
<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
