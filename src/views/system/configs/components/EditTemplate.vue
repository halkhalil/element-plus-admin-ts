<template>
  <el-dialog :title="!formModel.id ? '新增' : '编辑'" v-model="dialog" top="10vh">
    <el-form ref="formRef" :model="formModel" :rules="formRules" v-loading="loading.item" label-width="80px">
      <el-form-item label="配置分组" prop="group">
        <el-radio-group v-model="formModel.group">
          <el-radio v-for="item in getConfigGroups" :key="item.label" :label="item.value" border>
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="配置类型" prop="type">
        <el-radio-group v-model="formModel.type">
          <el-radio v-for="item in ConfigTypeEnum" :key="item" :label="item" border>
            {{ item }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="配置标识" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入英文唯一标识">
          <template #prepend v-if="formModel.group">{{ formModel.group }}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="配置名称" prop="label">
        <el-input v-model="formModel.label" placeholder="请输入中文配置名称"></el-input>
      </el-form-item>
      <el-form-item label="渲染组件" prop="component">
        <el-select v-model="formModel.component" :clearable="true" placeholder="请选择渲染组件" class="w-full">
          <el-option v-for="(item,index) in RenderComponentEnum" :label="item" :value="item" :key="index"/>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="验证规则" prop="validate">-->
      <!--        <el-select v-model="formModel.validate" :clearable="true" placeholder="请选择渲染组件" class="w-full">-->
      <!--          <el-option v-for="(item,index) in ConfigComponentEnum" :label="item" :value="item"-->
      <!--                     :key="index"></el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="扩展参数" prop="component_props">
        <el-input v-model="formModel.props" placeholder="一行一组配置项 示例：class=demo" type="textarea"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item label="枚举项" prop="extra" v-if="showExtraComponent.includes(formModel.component)">
        <el-input v-model="formModel.extra" type="textarea" placeholder="一行一组配置项 示例：key1=value1"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item label="配置值" prop="value">
        <el-input v-model="formModel.value" type="textarea" rows="3"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary"
                 @click="submitForm(formRef,{data:formModel})"
                 :loading="loading.submit">
        {{ loading.submit ? '提交中 ...' : '确 定' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {computed, inject, ref, shallowReactive, watch} from "vue";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {FormInstance, FormRules} from "element-plus";
import {ConfigItem} from "~/api/config/ConfigModel";
import {defaultForm} from "~/api/config/ConfigModel";
import {useConfig} from "~/composables/config/useConfig";
import {RenderComponentEnum, ConfigTypeEnum} from "~/enums/config";

const formRef = ref<FormInstance>();
const formModel = ref<ConfigItem>(defaultForm);
const formRules = shallowReactive<FormRules>({
  group: [{required: true, message: '请选择配置分组', trigger: 'change'}],
  name: [{required: true, message: '请输入配置标识', trigger: 'blur'}],
  label: [{required: true, message: '请输入配置标题', trigger: 'blur'}],
  type: [{required: true, message: '请选择配置类型', trigger: 'change'}],
  component: [{required: true, message: '请选择渲染组件', trigger: 'change'}],
  extra: [{required: true, message: '请输入配置项', trigger: 'blur'}],
  value: [{required: true, message: '请输入配置值', trigger: 'blur'}]
})

const showExtraComponent = [
  RenderComponentEnum.Select,
  RenderComponentEnum.Radio,
  RenderComponentEnum.RadioGroup,
  RenderComponentEnum.Checkbox,
  RenderComponentEnum.CheckboxGroup,
];

const {dialog, editable, loading, submitForm} = <UseApiResourcesReturn>inject('useResources');

const {getConfigGroups, getConfigTypes, getConfigComponents} = useConfig();

// 监控编辑事件
watch(editable, () => (formModel.value = editable.value as ConfigItem ?? defaultForm));
</script>