<template>
  <div class="m-2 flex justify-center items-center h-300px bg" style="background: var(--el-color-primary)">
    <h1>{{ RoleEnum.TEST }}角色可见</h1>
  </div>
</template>
<script lang="ts" setup>
import {RoleEnum} from "~/enums/permission";
</script>