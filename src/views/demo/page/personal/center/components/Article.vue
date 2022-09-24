<template>
  <el-row class="divide-y border-base">
    <el-col :span="24" v-for="(item,index) in lists" :key="index">
      <div class="flex justify-center mr-2 w-full p-2">
        <el-image class="w-80px" :src="item.image" fit="cover"></el-image>
        <div class="ml-2 w-full text-sm">
          <div class="flex justify-between">
            <div class="text-md text-primary">{{ item.title }}</div>
            <div class="text-regular">{{ item.time }}</div>
          </div>
          <div class="text-base text-regular py-1 line-clamp-2">{{ item.desc }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {getProjectData} from "./data";

const lists = getProjectData(15);
</script>