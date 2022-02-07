<template>
  <div id="vditor"></div>
</template>

<script lang="ts" setup>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import {onMounted, onUnmounted, watch, nextTick} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => ({}),
  }
});
const emit = defineEmits(['update:modelValue']);
let editor;

onMounted(() => {
  editor = new Vditor('vditor', {
    after: () => nextTick(() => editor.setValue(props.modelValue)),
    input: (value) => emit('update:modelValue', value),
    ...props.options,
  })
});

watch(() => props.modelValue, (newVal) => {
  if (newVal !== editor.getValue()) {
    editor.setValue(newVal);
  }
})

const getInstance = () => {
  return editor;
}

onUnmounted(() => {
  editor = null;
});

defineExpose({getInstance});
</script>

<style scoped>

</style>