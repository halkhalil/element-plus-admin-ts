<template>
  <el-drawer :title="!formModel?.id ? '新增用户' : '编辑用户'" v-model="dialog">
    <!--      <BasicForm :schemas="formSchemas" :rules="rules"></BasicForm>-->
    {{ formModel }}
    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px" autocomplete="off">
      <el-form-item label="自增标识" v-if="formModel?.id" required>
        <el-input v-model="formModel.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户标识" prop="username">
        <el-input v-model="formModel.username" placeholder="用户名、手机号、邮箱等唯一标识"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname" placeholder="请输入用户昵称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="formModel.password" show-password minlength="6" maxlength="20" autocomplete="new-password"
                  placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="role_ids">
        <el-select v-model="formModel.role_ids" :multiple="true" placeholder="请选择用户角色" class="w-full">
          <el-option v-for="item in roles?.data" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态" prop="status">
        <el-switch v-model="formModel.status" active-text="启用" inactive-text="禁用" :active-value="1"
                   :inactive-value="0"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm(formRef,true,formModel)"
                   :loading="!getConfirmLoading">
          {{ !getConfirmLoading ? '提交中 ...' : '确 定' }}
        </el-button>
        <el-button @click="resetForm(formRef)">重 置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script lang="ts" setup>
import {inject, watch, reactive, ref, toRefs} from "vue";
import {useFetchRoles} from "~/api/useFetchAll";
import {UseApiResourceReturn} from "~/composables/useApiResources";
import {BasicForm} from '~/components/Form';
import type {FormInstance, FormRules} from 'element-plus';
import {UserItem} from "~/api/user/UserModel";
import {Interface} from "readline";

const formSchemas = reactive([
  {filed: 'username', component: 'Input', label: '用户标识', placeholder: '用户标识'}
]);
const formRef = ref<FormInstance>();
const formModel = ref({});
const formRules = reactive({
  username: [{required: true, message: '用户标识为必选项', trigger: 'change'}],
  nickname: [{required: true, message: '用户昵称为必选项', trigger: 'change'}],
  password: [{required: true, min: 6, max: 30, message: '密码为6-30个字符', trigger: 'blur'}],
  role_ids: [],
  status: [{required: true}],
})

const {
  dialog,
  itemReturn,
  submitForm,
  resetForm,
  getConfirmLoading,
} = inject('useResources') as UseApiResourceReturn;

const {data: roles, execute: fetchRoles} = useFetchRoles();

watch(dialog, async () => dialog.value && fetchRoles());
watch(itemReturn.data, (newVal) => formModel.value = newVal.data)

</script>