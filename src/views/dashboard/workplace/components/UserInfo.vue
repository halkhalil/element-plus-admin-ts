<template>
  <el-card shadow="never">
  <el-row :gutter="10">
    <el-col :xs="24" :sm="12" :md="10" :lg="7">
      <div class="flex flex-row">
        <el-avatar :size="80" :src="getUser.avatar" fit="fill"></el-avatar>
        <div class="p-2 ml-3">
          <div class="text-lg font-bold " style="color: var(--el-text-color-primary)">早安，{{ getUser.nickname }}</div>
          <div class="text-gray-500 pt-2">今天天气不错，挺风和日丽的</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="{span:8,offset:4}" :md="{span:8,offset:6}" :lg="{span:6,offset:11}">
      <div class="w-250px h-full flex items-center justify-between">
        <div class="flex flex-col items-center">
          <span class="text-base">待办</span>
          <span>90</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex flex-col items-center">
          <span class="text-base">待办</span>
          <span>66</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex flex-col items-center">
          <span class="text-base">待办</span>
          <span>80</span>
        </div>
      </div>
    </el-col>
  </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import {useUser} from "~/composables/useUser";

const {getUser} = useUser();
</script>