<template>
  <ba-dialog :title="!formModel.id ? '新增' : '编辑'" v-model="dialog">
    <ba-form v-model="formModel" :schemas="formSchemas" :rules="formRules" label-width="50px">
      <template #actions="{formRef}">
        <div class="text-right">
          <el-button @click="cancelForm(formRef)">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef,{data:formModel})" :loading="loading.submit">
            保存
          </el-button>
        </div>
      </template>
    </ba-form>
  </ba-dialog>
</template>

<script lang="ts" setup>
import {inject, watch, ref, reactive} from "vue";
import {useFetchRoles} from "~/api/useFetchAll";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {FormInstance, FormItemRule, FormRules} from "element-plus";
import {UserItem, defaultForm} from "~/api/user/UserModel";
import {FormSchemas} from "~/components/Form/src/types";
import {BaForm} from "~/components/Form";
import {BaDialog} from "~/components/Dialog";

const {roles, execute: fetchRoles} = useFetchRoles();

const formRef = ref<FormInstance>();
const formModel = ref<UserItem>(defaultForm);
const formRules = reactive<FormRules>({
  email: [{required: true, message: '邮箱为必选项', trigger: 'blur'}],
  realname: [{required: true, message: '姓名为必选项', trigger: 'blur'}],
  mobile: [{required: true, message: '手机为必选项', trigger: 'blur'}],
  password: [{required: true, min: 6, max: 30, message: '密码为6-30个字符', trigger: 'blur'}],
  status: [{required: true}],
});

const formSchemas = reactive<FormSchemas>([
  {field: 'email', label: '邮箱', placeholder: '请输入邮箱', component: 'Input'},
  {field: 'realname', label: '姓名', placeholder: '请输入姓名', component: 'Input'},
  {field: 'mobile', label: '手机', placeholder: '请输入手机', component: 'Input'},
  {field: 'nickname', label: '昵称', placeholder: '请输入昵称', component: 'Input'},
  {field: 'password', label: '密码', placeholder: '请输入密码', component: 'Input'},
  {
    field: 'role_ids',
    label: '角色',
    placeholder: '请选择角色',
    component: 'Select',
    componentProps: {options: roles, multiple: true, class: 'w-full'}
  },
  {field: 'status', label: '状态', placeholder: '请选择角色', component: 'Switch'},
]);

const {dialog, editable, loading, submitForm, cancelForm} = <UseApiResourcesReturn>inject('useResources');

watch(dialog, async () => dialog.value && await fetchRoles());
watch(editable, () => {
  formModel.value = editable.value as UserItem ?? defaultForm;
  (formRules.password as FormItemRule)[0].required = !formModel.value.id;
});
</script>