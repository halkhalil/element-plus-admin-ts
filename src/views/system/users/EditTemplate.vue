<template>
  <el-dialog :title="!formModel.id ? '新增' : '编辑'" v-model="dialog" :fullscreen="getIsMobile">
    <el-form ref="formRef" :model="formModel" :rules="formRules" v-loading="loading.item"
             :label-position="getIsMobile ? 'top' : 'right'" label-width="80px">
      <el-form-item label="用户主键" v-if="formModel?.id" required>
        <el-input v-model="formModel.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="realname">
        <el-input v-model="formModel.realname" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户手机" prop="mobile">
        <el-input v-model="formModel.mobile" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="formModel.password" show-password minlength="6" maxlength="20" autocomplete="new-password"
                  placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="formModel.role_ids" :multiple="true" placeholder="请选择用户角色" class="w-full">
          <el-option v-for="item in roles?.data" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态" prop="status">
        <el-switch v-model="formModel.status" active-text="启用" inactive-text="禁用" :active-value="1"
                   :inactive-value="0"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="resetForm(formRef)">重 置</el-button>
      <el-button type="primary" @click="submitForm(formRef,{data:formModel})" :loading="loading.submit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {inject, watch, ref, reactive} from "vue";
import {useFetchRoles} from "~/api/useFetchAll";
import {UseApiResourcesReturn} from "~/composables/useApiResources";
import {FormInstance, FormItemRule, FormRules} from "element-plus";
import {UserItem, defaultForm} from "~/api/user/UserModel";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const formRef = ref<FormInstance>();
const formModel = ref<UserItem>(defaultForm);
const formRules = reactive<FormRules>({
  email: [{required: true, message: '邮箱为必选项', trigger: 'blur'}],
  realname: [{required: true, message: '姓名为必选项', trigger: 'blur'}],
  mobile: [{required: true, message: '手机为必选项', trigger: 'blur'}],
  password: [{required: true, min: 6, max: 30, message: '密码为6-30个字符', trigger: 'blur'}],
  status: [{required: true}],
})

const {getIsMobile} = useRootSetting();
const {dialog, editable, loading, submitForm, resetForm} = <UseApiResourcesReturn>inject('useResources');

const {data: roles, execute: fetchRoles} = useFetchRoles();
watch(dialog, async () => dialog.value && await fetchRoles());
watch(editable, () => {
  formModel.value = editable.value as UserItem ?? defaultForm;
  (formRules.password as FormItemRule)[0].required = !formModel.value.id;
});
</script>