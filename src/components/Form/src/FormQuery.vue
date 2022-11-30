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
                       class="w-100px">
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
      <slot name="extra"></slot>
    </div>
  </div>
  <div v-if="advanced">
    <el-divider>高级搜索</el-divider>
    <Form class="query-form" v-bind="$props" :action="{submitText:'搜索'}" width-full @submit="handleSubmit" @reset="handleReset"></Form>
  </div>
</template>

<script lang="ts" setup>
import Form from './Form.vue'
import {Search} from '@element-plus/icons-vue'
import {ref, watch} from "vue";
import {formQueryProps} from "./props";
import {FormSchema} from "~/components/Form/src/types";
import {useVModel} from "@vueuse/core";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const props = defineProps(formQueryProps);
const emits = defineEmits(['update:modelValue', 'reset', 'submit']);

const formModel = useVModel(props, 'modelValue', emits);

const inputSchemas: FormSchema[] = (props.schemas as FormSchema[]).filter(item => item.component === 'Input');
const select = ref(inputSchemas.length > 0 ? inputSchemas[0].field : '');
const advanced = ref(props.advanced);
const {getIsMobile} = useRootSetting();

const resetForm = () => Object.keys(formModel.value).forEach(key => delete formModel.value[key]);
const handleSubmit = () => emits('submit', formModel.value)
const handleReset = () => emits('reset');

watch(advanced, () => resetForm());
</script>