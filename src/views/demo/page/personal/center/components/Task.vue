<template>
  <el-row :gutter="10">
    <el-col v-for="(item, index) in lists" :key="index" :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="py-1">
      <el-card :body-style="{ padding: '10px' }" shadow="never">
        <div class="flex justify-between h-30">
          <el-image width="200" :src="item.image" fit="fill" :preview-src-list="[item.image]"></el-image>
          <div class="h-full m-2" style="flex:1">
            <div class="flex justify-between">
              <div class="text-md text-regular">{{ item.title }}</div>
              <span class="text-base text-secondary ">{{ item.name }}</span>
            </div>
            <div class="mt-2 text-base text-secondary line-clamp-3">{{ item.desc }}</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style lang="scss">

a {
  --el-bg-color: red;
  font-size: var(--el-border-color-dark);
}
</style>
<script lang="ts" setup>
import {getProjectData} from "./data";

const lists = getProjectData(32);
</script>