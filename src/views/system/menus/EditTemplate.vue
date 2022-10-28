<template>
  <el-dialog :title="!formModel.id ? '新增' : '编辑'" v-model="dialog" top="10vh" :fullscreen="getIsMobile">
    <el-form ref="formRef" :model="formModel" :rules="formRules" v-loading="loading.item" label-width="80px">
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="formModel.type">
          <el-radio-button v-for="(key,value) in MenuTypeEnum" :key="key" :label="(value+'').toLowerCase()">
            {{ key }}
          </el-radio-button>
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
          :clearable="true"
          filterable
          class="w-full"
        />
      </el-form-item>
      <el-form-item label="英文标识" prop="name">
        <el-input v-model="formModel.name"></el-input>
        <span class="text-xs text-secondary">路由别名，同时作为服务端权限唯一标识</span>
      </el-form-item>
      <el-form-item label="显示名称" prop="label">
        <el-input v-model="formModel.label"></el-input>
      </el-form-item>
      <el-form-item label="路由地址" prop="path">
        <el-input v-model="formModel.path" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="组件路径" prop="component">
        <el-input v-model="formModel.component" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <icon-picker v-model="formModel.icon" clearable class="w-full"/>
      </el-form-item>
      <div class="grid grid-cols-2 lt-xl:grid-cols-1">
        <el-form-item label="是否缓存" prop="keepalive">
          <el-switch v-model="formModel.keepalive" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="是否外链" prop="keepalive">
          <el-switch v-model="formModel.keepalive" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="固定标签" prop="affix">
          <el-switch v-model="formModel.affix" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="菜单状态" prop="status">
          <el-switch v-model="formModel.status" :active-value="1" :inactive-value="0"/>
        </el-form-item>
      </div>
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
import {inject, watch, ref, computed, shallowReactive} from "vue";
import {IconPicker} from '~/components/Icon'
import {MenuTypeEnum} from "~/enums/app";
import {FormInstance, FormRules} from "element-plus";
import {useFetchMenus} from "~/api/useFetchAll";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {MenuItem, defaultForm} from "~/api/menu/MenuModel";
import {RoleItem} from "~/api/role/RoleModel";
import {listToTree} from "~/utils/helper/treeHelper";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const formRef = ref<FormInstance>();
const formModel = ref<MenuItem>(defaultForm);
const formRules = shallowReactive<FormRules>({
  pid: [{required: true, message: '请选择父级节点', trigger: 'change'}],
  type: [{required: true, message: '请选择菜单类型', trigger: 'change'}],
  name: [{required: true, pattern: /^(\w|:){3,50}$/, message: '标识为必填项，3-50个英文字符', trigger: 'blur'}],
  label: [{required: true, message: '请输入显示名称', trigger: 'blur'}],
  method: [{required: true, message: '请选择请求方式', trigger: 'change'}],
  path: [{required: true, message: '请输入目标地址', trigger: 'blur'}],
});

const {dialog, editable, loading, submitForm, resetForm} = <UseApiResourcesReturn>inject('useResources');
const {data: menus, execute: fetchTree} = useFetchMenus();
const treeMenus = computed(() => {
  const _menus = menus.value?.data.map(item => ({...item, value: item.id}));
  return [{label: '根节点', value: 0}].concat(listToTree((_menus || [])));
});

const {getIsMobile} = useRootSetting()

watch(dialog, async () => dialog.value && await fetchTree());
watch(editable, () => formModel.value = editable.value as RoleItem ?? defaultForm);
</script>