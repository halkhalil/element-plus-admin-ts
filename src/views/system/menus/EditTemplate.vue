<template>
  <el-dialog :title="!formModel.id ? '新增' : '编辑'"
             v-model="dialog" top="10vh"
             @closed="resetForm(formRef)"
             :fullscreen="getIsMobile">
    <el-form ref="formRef" :model="formModel" :rules="formRules" v-loading="loading.item" label-width="80px">
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="formModel.type">
          <el-radio v-for="item in MenuTypeEnum" :key="item" :label="item" border/>
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
      <el-form-item label="菜单标题" prop="label">
        <el-input v-model="formModel.label" placeholder="请输入显示名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单标识" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入唯一英文标识，大坨峰格式，示例：SystemManager"></el-input>
      </el-form-item>
      <el-form-item label="路由地址" prop="path" v-if="formModel.type !== MenuTypeEnum.BUTTON">
        <el-input v-model="formModel.path" placeholder="请输入路由地址，示例：/systems/menus"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" v-show="formModel.type !== MenuTypeEnum.BUTTON">
        <icon-picker v-model="formModel.icon" clearable class="w-full"/>
      </el-form-item>
      <el-form-item label="规则类型" prop="type" v-if="formModel.type === MenuTypeEnum.MENU">
        <el-radio-group v-model="formModel.rule">
          <el-radio v-for="item in MenuRuleEnum" :key="item" :label="item" border/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="组件路径" prop="component"
                    v-if="formModel.type === MenuTypeEnum.MENU && formModel.rule === MenuRuleEnum.TAB">
        <el-input v-model="formModel.component"
                  placeholder="请输入组件路径地址，示例：/views/dashboard/workplace/index.vue"/>
      </el-form-item>
      <el-form-item label="链接地址" prop="link"
                    v-if="formModel.type === MenuTypeEnum.MENU && formModel.rule !== MenuRuleEnum.TAB">
        <el-input v-model="formModel.link" placeholder="请输入连接地址，示例：https://www.baidu.com"></el-input>
      </el-form-item>
      <div class="grid grid-cols-3 lt-xl:grid-cols-1">
        <el-form-item label="缓存状态" prop="keepalive" required v-if="formModel.type === MenuTypeEnum.MENU">
          <el-switch v-model="formModel.keepalive" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="固定标签" prop="affix" required v-if="formModel.type === MenuTypeEnum.MENU">
          <el-switch v-model="formModel.affix" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="启用状态" prop="status" required>
          <el-switch v-model="formModel.status" :active-value="1" :inactive-value="0"/>
        </el-form-item>
      </div>
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
import {inject, watch, ref, computed, shallowReactive} from "vue";
import {IconPicker} from '~/components/Icon'
import {MenuTypeEnum, MenuRuleEnum} from "~/enums/app";
import {FormInstance, FormRules} from "element-plus";
import {useFetchMenus} from "~/api/useFetchAll";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {MenuItem, defaultForm} from "~/api/menu/MenuModel";
import {listToTree} from "~/utils/helper/treeHelper";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const formRef = ref<FormInstance>();
const formModel = ref<MenuItem>(defaultForm);
const formRules = shallowReactive<FormRules>({
  pid: [{required: true, message: '请选择父级节点', trigger: 'change'}],
  type: [{required: true, message: '请选择菜单类型', trigger: 'change'}],
  label: [{required: true, message: '请输入显示名称', trigger: 'blur'}],
  name: [{required: true, pattern: /^(\w|:){3,50}$/, message: '标识为必填项，3-50个英文字符', trigger: 'blur'}],
  link: [{required: true, message: '请输入连接地址', trigger: 'blur'}],
  path: [{required: true, message: '请输入路由地址', trigger: 'blur'}],
  component: [{required: true, message: '请输入组件路径', trigger: 'blur'}],
});

const {getIsMobile} = useRootSetting();
const {dialog, editable, loading, submitForm, resetForm} = <UseApiResourcesReturn>inject('useResources');
const {data: menus, execute: fetchTree} = useFetchMenus();
const treeMenus = computed(() => {
  const _menus = menus.value?.data.map(item => ({...item, value: item.id}));
  return [{label: '根节点', value: 0}].concat(listToTree((_menus || [])));
});

watch(dialog, async () => dialog.value && await fetchTree());
watch(editable, () => formModel.value = editable.value as MenuItem ?? defaultForm);
</script>