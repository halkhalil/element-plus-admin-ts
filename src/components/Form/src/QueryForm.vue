<template>
  <div class="flex justify-between">
    <div class="w-400px" v-if="!$props.simple && !getIsMobile">
      <el-form @keyup.enter="handleSubmit">
        <el-input v-model="formModel[select]" :disabled="advanced" clearable placeholder="输入关键字按下回车进行搜索">
          <template #prepend>
            <el-select v-model="select"
                       :disabled="advanced"
                       @change="resetForm"
                       placeholder="请选择"
                       style="width: 100px;">
              <template v-for="schema in inputSchemas">
                <el-option :label="schema.label || schema.placeholder" :value="schema.field"/>
              </template>
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="advanced=!advanced"/>
          </template>
        </el-input>
      </el-form>
    </div>
    <div v-else>
      <el-button :icon="Search" @click="advanced=!advanced"/>
    </div>
    <div>
      <slot name="extra">
      </slot>
    </div>
  </div>
  <div v-if="advanced">
    <el-divider>高级搜索</el-divider>
    <basic-form v-bind="$props" @submit="handleSubmit" @reset="handleReset"></basic-form>
  </div>
</template>

<script lang="ts" setup>
import BasicForm from './Form.vue'
import {Search} from '@element-plus/icons-vue'
import {computed, ref, watch} from "vue";
import {formProps} from "./props";
import {FormSchema} from "~/components/Form/src/types";
import {useVModel} from "@vueuse/core";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const props = defineProps({
  ...formProps,
  simple: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'reset', 'submit']);

const {schemas} = props;
const formModel = useVModel(props, 'modelValue', emit);

const inputSchemas: FormSchema[] = (schemas as FormSchema[]).filter(item => item.component === 'Input');
const select = ref(inputSchemas.length > 0 ? inputSchemas[0].field : '');
const advanced = ref(false);
const {getIsMobile} = useRootSetting();

const resetForm = () => Object.keys(formModel.value).forEach(key => delete formModel.value[key]);
const handleSubmit = () => emit('submit', formModel.value)
const handleReset = () => emit('reset');

watch(advanced, () => resetForm());
</script>