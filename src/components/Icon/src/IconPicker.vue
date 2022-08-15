<template>
  <div>
    <el-input
      ref="inputElRef"
      v-model="selectIcon"
      :placeholder="$props.placeholder"
      :clearable="$props.clearable"
      :disabled="$props.disabled"
      :readonly="$props.readonly"
      @input="handleSearch"
    >
      <template #append>
        <Icon :icon="selectIcon ? selectIcon : 'ep:aim'" :size="$props.size"/>
      </template>
    </el-input>

    <el-popover
      ref="popoverRef"
      :virtual-ref="inputElRef"
      trigger="click"
      show-arrow
      virtual-triggering
      :placement="placement"
      :disabled="disabled"
      :width="popWrapWidth"
    >
      <el-scrollbar :max-height="300">
        <div class="flex-row" v-if="true">
          <el-icon v-for="(item, index) in icons"
                   :key="index"
                   @click="handleSelect(item)"
                   :size="$props.size"
                   class="w-10 h-10 cursor-pointer hover:bg-gray-100 ">
            <Icon :icon="item"/>
          </el-icon>
        </div>
        <span v-else class="no-data" v-text="$props.emptyText"></span>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import {icons as iconData} from '../data'
import {ref} from 'vue';
import {useDebounceFn, useElementBounding, useVModel} from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: 20,
  },
  placement: {
    type: String,
    default: 'bottom',
  },
  placeholder: {
    type: String,
    default: '请选择图标'
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  emptyText: {
    type: String,
    default: '没有匹配到可用图标'
  }
});
const emit = defineEmits(['modelValue'])

const icons = ref(iconData);
const visible = ref(false);

const inputElRef = ref()
const selectIcon = useVModel(props, 'modelValue', emit);

const {width: popWrapWidth} = useElementBounding(inputElRef)

const handleSelect = (item) => {
  selectIcon.value = item;
}

const handleSearch = useDebounceFn((value) => {
  icons.value = icons.value.filter(item => item.includes(value))
}, 200)

const handleFocus = () => visible.value = true;
const handleBlur = () => visible.value = false;
</script>