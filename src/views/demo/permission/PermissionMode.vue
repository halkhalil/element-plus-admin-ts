<template>
  <div class="mt-2">
    权限模式：
    <el-button-group>
      <el-button :type="!isBackMode ? 'primary' : 'default'" @click="togglePermissionMode">
        前端权限模式
      </el-button>
      <el-button :type="isBackMode ? 'primary' : 'default'" @click="togglePermissionMode">
        后端权限模式
      </el-button>
    </el-button-group>
  </div>
</template>
<script lang="ts" setup>
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {PermissionModeEnum} from "~/enums/permission";
import {computed} from "vue";
import {useStore} from "vuex";

const {dispatch} = useStore();
const {getPermissionMode, togglePermissionMode} = useRootSetting();
const isBackMode = computed(() => getPermissionMode.value == PermissionModeEnum.BACK_MENU);
</script>

