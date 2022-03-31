<template>
  <el-row :gutter="10">
    <el-col v-for="(item, index) in lists" :key="index" :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="py-1">
      <el-card :body-style="{ padding: '10px' }" shadow="none">
        <div class="flex-between h-30">
          <el-image class="image" :src="item.image" :preview-src-list="[item.image]"></el-image>
          <div class=" wh-full m-2">
            <div class="font-bold">{{ item.title }}</div>
            <div class="flex-row text-sm text-gray-500">
              <div class="flex-between mt-1">
                <span>{{ item.name }}</span>
                <span>{{ item.time }}</span>
              </div>
              <div class="text-gray-500 line-clamp-3 mt-2">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import {getProjectData} from "./data";

const lists = getProjectData(32);
</script>