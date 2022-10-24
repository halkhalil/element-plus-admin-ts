<template>
  <el-dialog :title="!formModel.id ? '新增' : '编辑'" v-model="dialog">
    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
      <el-form-item label="主键标识" v-if="formModel?.id" required>
        <el-input v-model="formModel.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formModel.email" placeholder="用户名、手机号、邮箱等唯一标识"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realname">
        <el-input v-model="formModel.realname" placeholder="请输入用户真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formModel.mobile" placeholder="请输入用户手机号"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formModel.nickname" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formModel.password" show-password minlength="6" maxlength="20" autocomplete="new-password"
                  placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formModel.role_ids" :multiple="true" placeholder="请选择用户角色" class="w-full">
          <el-option v-for="item in roles?.data" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="formModel.status" active-text="启用" inactive-text="禁用" :active-value="1"
                   :inactive-value="0"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submitForm(formRef,{data:formModel})" :loading="loading.submit">
        {{ loading.submit ? '提交中 ...' : '确 定' }}
      </el-button>
      <el-button @click="resetForm(formRef)">重 置</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {inject, watch, reactive, ref} from "vue";
import {useFetchRoles} from "~/api/useFetchAll";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {FormInstance, FormItemRule, FormRules} from "element-plus";
import {UserItem, defaultForm} from "~/api/user/UserModel";

const formRef = ref<FormInstance>();
const formModel = ref<UserItem>(defaultForm);
const formRules = reactive<FormRules>({
  email: [{required: true, message: '用户标识为必选项', trigger: 'blur'}],
  realname: [{required: true, message: '用户昵称为必选项', trigger: 'blur'}],
  mobile: [{required: true, message: '用户昵称为必选项', trigger: 'blur'}],
  password: [{required: true, min: 6, max: 30, message: '密码为6-30个字符', trigger: 'blur'}],
  status: [{required: true}],
})

const {dialog, editable, loading, submitForm, resetForm} = <UseApiResourcesReturn>inject('useResources');

const {data: roles, execute: fetchRoles} = useFetchRoles();
watch(dialog, async () => dialog.value && await fetchRoles());
watch(editable, () => {
  formModel.value = editable.value as UserItem ?? defaultForm;
  (formRules.password as FormItemRule)[0].required = !formModel.value.id;
});
</script>