<template>
  <el-dialog :title="!formModel.id ? '新增' : '编辑'" v-model="dialog" top="10vh">
    <el-form ref="formRef" :model="formModel" :rules="formRules" v-loading="loading.item" label-width="80px">
      <el-form-item label="英文标识" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入角色英文标识"></el-input>
      </el-form-item>
      <el-form-item label="动作名称" prop="label">
        <el-input v-model="formModel.label" placeholder="请输入角色中文名称"></el-input>
      </el-form-item>
      <el-form-item label="请求方式" prop="method">
        <el-select v-model="formModel.method"
                   placeholder="请选择请求方式"
                   :filterable="true"
                   :clearable="true"
                   class="w-full">
          <el-option v-for="(key,value) in MethodEnum" :key="key" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求地址" prop="uri">
        <el-input v-model="formModel.uri" placeholder="请输入地址"></el-input>
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
import {inject, ref, shallowReactive, watch} from "vue";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {FormInstance, FormRules} from "element-plus";
import {RoleItem} from "~/api/role/RoleModel";
import {MethodEnum} from "~/enums/http";
import {ActionItem, defaultForm} from "~/api/action/ActionModel";

const formRef = ref<FormInstance>();
const formModel = ref<ActionItem>(defaultForm);
const formRules = shallowReactive<FormRules>({
  name: [{required: true, pattern: /^(\w|:|-){3,50}$/, message: '标识为必填项，3-50个英文字符', trigger: 'blur'}],
  label: [{required: true, message: '请输入显示名称', trigger: 'blur'}],
  method: [{required: true, message: '请选择请求方式', trigger: 'change'}],
  uri: [{required: true, message: '请输入后端url地址', trigger: 'blur'}],
})

const {dialog, editable, loading, submitForm} = <UseApiResourcesReturn>inject('useResources');

// 监控编辑事件
watch(editable, () => (formModel.value = editable.value as RoleItem ?? defaultForm));
</script>