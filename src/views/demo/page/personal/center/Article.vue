<template>
  <el-row class="divide-y">
    <el-col :span="24" v-for="(item,index) in lists" :key="index">
      <div class="flex-x-center mr-2 w-full p-2">
        <el-image class="w-80px" :src="item.image"></el-image>
        <div class="ml-2 w-full">
          <div class="flex-between">
            <h4 class="text-base">{{ item.title }}</h4>
            <div class="text-sm text-gray-500">{{ item.time }}</div>
          </div>
          <div class="text-sm text-gray-500 py-1">{{ item.desc }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {getProjectData} from "./data";

const lists = getProjectData(15);
</script>