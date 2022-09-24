<template>
  <div class="divide-y border-base">
    <div class="flex justify-between p-2" v-for="(item,index) in secureSettingList" :key="index">
      <div>
        <div class="text-base text-primary font-500">{{ item.label }}</div>
        <div class="text-base text-secondary mt-3">{{ item.description }}</div>
      </div>
      <div class="flex flex-col justify-center">
        <el-switch v-model="item.status"></el-switch>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";

const secureSettingList = reactive([
  {label: '系统消息', value: '1', description: '系统消息', status: true},
  {label: '待办任务', value: '2', description: '待办任务', status: true},
  {label: '站内信', value: '2', description: '站内信', status: true},
])
</script>