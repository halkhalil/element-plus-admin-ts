<template>
  <el-drawer
    :title="!item.id ? '新增配置' : '编辑配置'"
    v-model="dialog"
    @close="cancelItem">
    <template #default>
      <el-form ref="formElRef" :model="item" :rules="rules" label-width="80px" autocomplete="off">
        <el-form-item label="用户标识" prop="username">
          <el-input v-model="item.username" placeholder="用户名、手机号、邮箱等唯一标识"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="item.nickname" placeholder="请输入用户昵称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :prop="!item.id ? 'password' : ''">
          <el-input v-model="item.password" show-password minlength="6" maxlength="20" autocomplete="off"
                    placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="item.role_ids" multiple placeholder="请选择用户角色" style="width: 100%;">
            <el-option v-for="item in roles?.data" :key="item.id" :label="item.label" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-radio-group v-model="item.status">
            <el-radio-button :label="1">启用</el-radio-button>
            <el-radio-button :label="0">禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelItem">取 消</el-button>
          <el-button type="primary" @click="confirmItem" :loading="confirmLoading">
            {{ confirmLoading ? '提交中 ...' : '确 定' }}
          </el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import {BasicDrawer} from "~/components/Drawer";
import {inject, watch, reactive} from "vue";
import {useFetchRoles} from "~/api/useFetchAll";
import {UserUseFetchResourcesReturn} from "~/api/useFetchUsers";

const rules = reactive({
  username: [{required: true, message: '请选择配置分组', trigger: 'change'}],
  nickname: [{required: true, message: '请选择配置类型', trigger: 'change'}],
  password: [{required: true, pattern: /^(\w|:|.){3,50}$/, message: '请选择渲染组件', trigger: 'change'}],
  status: [{required: true}],
})

const {
  formElRef,
  item,
  dialog,
  cancelItem,
  confirmItem,
  confirmLoading
} = inject('useResource') as UserUseFetchResourcesReturn;

const {data: roles, execute: fetchRoles} = useFetchRoles({}, {immediate: false});

watch(dialog, async () => dialog.value && fetchRoles());
</script>