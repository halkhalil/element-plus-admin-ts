<template>
  <el-dialog :title="!formModel.id ? '新增菜单' : '编辑菜单'" v-model="dialog">
    <el-form ref="formRef" :model="formModel" :rules="formRules" v-loading="loading.item" label-width="80px">
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="formModel.type">
          <el-radio-button v-for="(key,value) in menuTypes" :key="key" :label="value">{{ key }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级节点" prop="pid">
        <el-tree-select
          v-model="formModel.pid"
          :data="treeMenus"
          check-strictly
          placeholder="请选择父级菜单"
          :render-after-expand="false"
          :default-expand-all="true"
          :check-strictly="true"
          filterable
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="英文标识" prop="name">
        <el-input v-model="formModel.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="显示名称" prop="label">
        <el-input v-model="formModel.label" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="目标地址" prop="path">
        <el-select v-if="formModel.type === 'route'"
                   v-model="formModel.path"
                   placeholder="请选择路由页面"
                   :filterable="true"
                   :clearable="true"
                   class="w-full">
          <el-option v-for="(item,index) in getPermissionRoutes" :key="index" :value="item.path">
            <span style="float: left">{{ item.path }}</span>
            <span style="float: right">{{ item.meta.title }}</span>
          </el-option>
        </el-select>
        <el-input v-else v-model="formModel.path" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <icon-picker v-model="formModel.icon" clearable/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary"
                 @click="submitForm(formRef,{data:formModel})"
                 :loading="loading.submit">
        {{ loading.submit ? '提交中 ...' : '确 定' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {inject, watch, ref, shallowRef, computed} from "vue";
import {useConfig} from "~/composables/config/useConfig";
import {IconPicker} from '~/components/Icon'
import {MenuTypeEnum} from "~/enums/app";
import {FormInstance, FormRules} from "element-plus";
import {useFetchMenus} from "~/api/useFetchAll";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {MenuItem} from "~/api/menu/MenuModel";
import {RoleItem} from "~/api/role/RoleModel";
import {listToTree} from "~/utils/helper/treeHelper";

const _from: MenuItem = {id: null, pid: null, type: '', name: '', label: '', path: '', icon: ''};

const formRef = ref<FormInstance>();
const formModel = ref<MenuItem>(_from);
const formRules = shallowRef<FormRules>({
  pid: [{required: true, message: '请选择父级节点', trigger: 'change'}],
  type: [{required: true, message: '请选择菜单类型', trigger: 'change'}],
  name: [{required: true, pattern: /^(\w|:){3,50}$/, message: '标识为必填项，3-50个英文字符', trigger: 'blur'}],
  label: [{required: true, message: '请输入显示名称', trigger: 'blur'}],
  method: [{required: true, message: '请选择请求方式', trigger: 'change'}],
  path: [{required: true, message: '请输入目标地址', trigger: 'blur'}],
});
const menuTypes = MenuTypeEnum;

const {getPermissionRoutes} = useConfig();
const {dialog, editable, loading, submitForm, resetForm} = <UseApiResourcesReturn>inject('useResources');
const {data: menus, execute: fetchTree} = useFetchMenus();
const treeMenus = computed(() => {
  const _menus = menus.value?.data.map(item => ({...item, value: item.id}))
  return listToTree(_menus || [])
});

watch(dialog, async () => dialog.value && await fetchTree());
watch(editable, () => formModel.value = editable.value as RoleItem ?? _from);
</script>