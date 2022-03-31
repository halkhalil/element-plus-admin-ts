<template>
  <el-row class="divide-y">
    <el-col :span="24" v-for="(item,index) in lists" :key="index">
      <div class="flex-x-center mr-2 w-full p-2">
        <el-image class="w-80px" :src="item.image" fit="full"></el-image>
        <div class="ml-2 w-full text-sm">
          <div class="flex-between">
            <h4 class="font-normal">{{ item.title }}</h4>
            <div class="text-gray-500">{{ item.time }}</div>
          </div>
          <div class="text-gray-500 py-1 line-clamp-2">{{ item.desc }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {getProjectData} from "./data";

const lists = getProjectData(15);
</script>