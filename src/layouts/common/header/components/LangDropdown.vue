<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      Dropdown List
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>简体中文</el-dropdown-item>
        <el-dropdown-item>English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import {useStore} from "~/store";

const {userStore} = useStore()
const getUser = userStore.getUser || {}

const logout = async () => {
  await userStore.fetchLogout();
  location.reload();
}
</script>