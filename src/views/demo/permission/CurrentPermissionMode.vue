<template>
  <div class="mt-2">
    当前权限模式:
    <el-button type="text"> {{ getPermissionModeLabel }}</el-button>
    <el-button @click="togglePermissionMode" type="primary" class="ml-4">切换权限模式</el-button>
  </div>
</template>
<script lang="ts" setup>
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {PermissionModeEnum} from "~/enums/permission";
import {computed} from "vue";

const {getPermissionMode, togglePermissionMode} = useRootSetting();
const getPermissionModeLabel = computed(() => {
  return getPermissionMode.value == PermissionModeEnum.BACK_MENU ? '后端权限模式' : '前端角色权限模式';
})
</script>

