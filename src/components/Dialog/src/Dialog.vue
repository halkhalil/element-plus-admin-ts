<template>
  <el-dialog v-model="VModel" v-bind="{...$props,...$attrs}"
             :fullscreen="props.fullscreen || getIsMobile"
             :draggable="true"
             :destroy-on-close="true"
             :close-on-click-modal="false">
    <template v-for="name in Object.keys(slots)">
      <slot v-if="name !== 'header'" :name="name"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import {useSlots,useAttrs} from "vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {dialogProps} from "element-plus";
import {useVModel} from "@vueuse/core";

const props = defineProps(dialogProps);
const emits = defineEmits(['update:modelValue', 'onOpen', 'onOpened', 'onClose', 'onClosed', 'onOpenAutoFocus', 'onCloseAutoFocus']);
console.log(useAttrs())
const slots = useSlots();
const {getIsMobile} = useRootSetting();
const VModel = useVModel(props, 'modelValue', emits);
</script>