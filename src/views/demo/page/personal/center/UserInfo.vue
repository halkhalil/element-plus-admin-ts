<template>
  <el-row class="md:divide-x divide-dashed">
    <el-col :xs="24" :sm="24" :md="8">
      <div class="px-5 flex-between">
        <div class="flex w-full">
          <div class="flex-col-center">
            <el-avatar :src="getUser.avatar" :size="80"></el-avatar>
            <div class="text-lg font-bold">{{ getUser.nickname }}</div>
          </div>
          <div class="ml-8">
            <div class="text-base font-bold">桔子数字科技有限责任公司</div>
            <ul class="list-none text-xs pt-2 leading-relaxed">
              <li><span>部门：</span><span>平台管理中心-数据管理部</span></li>
              <li><span>手机：</span><span>185****7987</span></li>
              <li><span>邮箱：</span><span>3600****002@qq.com</span></li>
              <li><span>简介：</span><span>海纳百川，有容乃大 <icon name="tb-edit"/></span></li>
            </ul>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8">
      <el-divider content-position="left" border-style="dashed">标签</el-divider>
      <div class="px-5">
        <el-space wrap>
          <el-tag v-for="tag in tags" :key="tag.name" :type="tag.type">
            {{ tag.name }}
          </el-tag>
        </el-space>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8">
      <el-divider content-position="left" border-style="dashed">待办</el-divider>
      <div class="p-2 flex-between text-base">
        <div class="flex-col-center w-1/3">
          <span>文章</span>
          <span>90</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex-col-center w-1/3">
          <span>任务</span>
          <span>66</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex-col-center w-1/3">
          <span>项目</span>
          <span>80</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useUser} from "~/composables/useUser";
import {getTagData} from "~/views/demo/page/personal/center/data";

const {getUser} = useUser();
const tags = getTagData();
</script>