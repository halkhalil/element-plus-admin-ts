<template>
  <el-card header="项目" shadow="none">
    <el-row :gutter="0">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item,index) in projects" :key="index">
        <el-card class="card" shadow="hover">
          <div class="flex">
            <el-avatar :src="item.image" :size="24"></el-avatar>
            <span class="ml-2 font-medium leading-6">{{ item.title }}</span>
          </div>
          <div class="line-clamp-2 text-gray-500 my-1">
            {{ item.desc }}
          </div>
          <div class="text-xs text-gray-500 flex-x-between">
            <span>{{ item.name }}</span>
            <span>{{ item.time }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script lang="ts" setup>
import {shallowReactive} from 'vue';
import {getProjectData} from "~/views/dashboard/workplace/data";

const projects = shallowReactive(getProjectData());
</script>