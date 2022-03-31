<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item,index) in projects" :key="index" class="mt-2">
      <el-card class="" shadow="hover">
        <div class="flex-row mb-1">
          <el-image :src="item.image" class="w-full h-50"></el-image>
          <div class="font-bold">{{ item.title }}</div>
        </div>
        <div class="text-gray-500 line-clamp-2 h-10">
          {{ item.desc }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import {getProjectData} from "./data";

const projects = getProjectData(21);
</script>