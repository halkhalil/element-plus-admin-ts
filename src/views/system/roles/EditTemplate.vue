<template>
  <el-dialog v-model="dialog" :title="!formModel?.id ?'新增':'编辑'" top="10vh">
    <el-scrollbar height="50vh" v-loading="loading.item">
      <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px" autocomplete="off">
        <el-form-item label="英文标识" prop="name">
          <el-input v-model="formModel.name" placeholder="请输入角色英文标识"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="label">
          <el-input v-model="formModel.label" placeholder="请输入角色中文名称"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <el-switch v-model="formModel.status" active-text="启用" inactive-text="禁用" :active-value="1"
                     :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="访问授权" prop="permission_ids">
          <el-tree
            ref="treeRef"
            v-if="dialog"
            v-loading="permissionLoading"
            :data="treePermissions"
            :props="{ children: 'children',label:treeShowLabel,class:treeShowClass}"
            :check-strictly="false"
            default-expand-all
            node-key="id"
            show-checkbox
            class="w-full"
            @check="permissionChecked">
          </el-tree>
        </el-form-item>
      </el-form>
    </el-scrollbar>
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
import {inject, watch, shallowReactive, ref, computed} from "vue";
import {useFetchPermissions} from "~/api/useFetchAll";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {listToTree} from "~/utils/helper/treeHelper";
import {ElTree, FormInstance, FormRules} from "element-plus";
import {RoleItem, defaultForm} from "~/api/role/RoleModel";

const formRef = ref<FormInstance>();
const formModel = ref<RoleItem>(defaultForm);
const formRules = shallowReactive<FormRules>({
  name: [{required: true, pattern: /^(\w|:){3,50}$/, message: '标识为必填项，3-50个英文字符', trigger: 'blur'}],
  label: [{required: true, message: '请输入显示名称', trigger: 'blur'}],
  permission_ids: [{required: true, message: '请选择权限节点', type: 'array', trigger: 'change'}],
})

const {dialog, editable, loading, submitForm} = <UseApiResourcesReturn>inject('useResources');

const treeRef = ref<InstanceType<typeof ElTree>>()
const setCheckedKeys = () => treeRef.value?.setCheckedKeys(formModel.value.permission_ids || []);
const permissionChecked = (checkedData, {checkedKeys}) => formModel.value.permission_ids = checkedKeys;

const {data: permissions, loading: permissionLoading, execute: fetchPermissions} = useFetchPermissions();
const treePermissions = computed(() => listToTree(permissions.value?.data || []))
const treeShowLabel = ({permissible}) => permissible.label;
const treeShowClass = (data, {level}) => level === 2 ? 'is-penultimate' : null;

// 监控编辑事件
watch(dialog, async () => dialog.value && await fetchPermissions());
watch(editable, () => (formModel.value = editable.value as RoleItem ?? defaultForm) && setCheckedKeys());
</script>