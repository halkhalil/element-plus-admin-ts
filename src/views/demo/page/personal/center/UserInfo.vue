<template>
  <div class="flex flex-row">
    <div class="w-1/3 flex-between">
      <div class="flex-between">
        <div class="flex-col-center">
          <el-avatar :src="getUser.avatar" :size="70"></el-avatar>
          <div class="text-lg font-bold">{{ getUser.nickname }}</div>
          <div class="text-xs w-max">海纳百川，有容乃大</div>
        </div>
        <div class="list-none ml-5">
          <div v-for="(team, index) in teams" :key="index">
            <icon :name="team.icon" :style="{color:team.color}" class="text-xl"></icon>
            <span class="text-df ml-1">{{ team.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/3">
      <el-space wrap>
        <el-tag v-for="tag in tags" :key="tag.name" :type="tag.type">
          {{ tag.name }}
        </el-tag>
      </el-space>
    </div>
    <div class="w-1/3 flex-between">
      <div class="task-item flex-col-center">
        <span class="label">待办</span>
        <span class="value">90</span>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="task-item flex-col-center">
        <span class="label">待办</span>
        <span class="value">66</span>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="task-item flex-col-center">
        <span class="label">待办</span>
        <span class="value">80</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUser} from "~/composables/useUser";
import {getTeamData, getTagData} from "~/views/demo/page/personal/center/data";

const {getUser} = useUser();
const tags = getTagData();
const teams = getTeamData();
</script>