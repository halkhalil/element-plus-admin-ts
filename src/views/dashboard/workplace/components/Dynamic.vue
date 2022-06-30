<template>
  <el-card header="动态" shadow="none">
    <el-row>
      <el-col :span="24" v-for="(item,index) in projects" :key="index" class="item flex-x-between">
        <div class="flex justify-between mr-2">
          <div>
            <el-image style="width: 60px; height: 60px" :src="item.image" :preview-src-list="[item.image]"></el-image>
          </div>
          <div class="ml-2">
            <div class="flex justify-between">
              <span class="title">{{ item.title }}</span>
              <span class="desc">{{ item.time }}</span>
            </div>
            <div class="line-clamp-2 desc">{{ item.desc }}</div>
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
<style lang="scss" scoped>
.title {
  color: var(--el-text-color-primary);
  font-size: var(--el-font-size-base);
}
.desc{
  color: var(--el-text-color-secondary);
  font-size: var(--el-font-size-small);
}
</style>