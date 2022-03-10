<template>
  <el-card header="动态" shadow="none">
    <el-row>
      <el-col :span="24" v-for="(item,index) in projects" :key="index" class="item flex-x-between">
        <div class="flex-x-between mr-2">
          <div>
            <el-image
              style="width: 60px; height: 60px"
              :src="item.image"
              :preview-src-list="[item.image]"
            >
            </el-image>
          </div>
          <div class="ml-2">
            <div class="flex-x-between">
              <span class="font-bold">{{ item.title }}</span>
              <span class="text-sm text-gray-500">{{ item.time }}</span>
            </div>
            <div class="text-sm line-clamp-2 text-gray-500">{{ item.desc }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script lang="ts" setup>
import {shallowReactive} from 'vue';
import {DynamicDataItem, getDynamicData} from "~/views/dashboard/workplace/data";

const projects: DynamicDataItem[] = shallowReactive(getDynamicData())
</script>
<style lang="scss" scoped>
.item {
  padding: 10px 0;
  border-bottom: solid 1px var(--el-border-color-lighter);

  &.item:last-child {
    border-bottom: 0;
  }
}
</style>