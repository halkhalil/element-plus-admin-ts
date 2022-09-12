<template>
  <div>
    <el-dropdown size="small" trigger="click">
      <div class="avatar flex items-center" style="color: var(--el-text-color-primary)">
        <el-avatar :size="30" :src="getUser.avatar">{{ getUser.nickname }}</el-avatar>
        <div class="flex pl-1">
          <span class="text-sm">{{ getUser.nickname }}</span>
          <Icon icon="ep:caret-bottom" class="ml-1 translate-y-1" :size="12"/>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <Icon icon="ep:user" :size="14" class="mr-1"/>
            个人中心
          </el-dropdown-item>
          <el-dropdown-item>
            <Icon icon="ep:setting" :size="14" class="mr-1"/>
            个人设置
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            <Icon icon="ep:switch-button" :size="14" class="mr-1"/>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
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