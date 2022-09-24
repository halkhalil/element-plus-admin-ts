<template>
  <el-row :gutter="50">
    <el-col :xs="24" :sm="24" :md="8">
<!--      <el-divider content-position="left" border-style="dashed">桔子数字科技有限责任公司</el-divider>-->
      <div class="p-4 flex justify-between items-center">
        <div class="flex w-full">
          <div class="flex flex-col justify-center items-center ">
            <el-avatar :src="getUser.avatar" :size="80"></el-avatar>
            <div class="text-lg font-bold">{{ getUser.nickname }}</div>
          </div>
          <div class="ml-6 m-2">
            <div class="text-sm flex flex-col justify-between items-stretch h-full">
              <div><span>部门：</span><span>平台管理中心-数据管理部</span></div>
              <div><span>手机：</span><span>185****7987</span></div>
              <div><span>邮箱：</span><span>3600****002@qq.com</span></div>
              <div><span>简介：</span><span>海纳百川，有容乃大 <icon name="tb-edit"/></span></div>
            </div>
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
      <div class="p-2 flex justify-between items-center text-base">
        <div class="flex justify-center items-center flex-col w-1/3">
          <span>文章</span>
          <span>90</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex justify-center items-center flex-col w-1/3">
          <span>任务</span>
          <span>66</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex justify-center items-center flex-col w-1/3">
          <span>项目</span>
          <span>80</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useUser} from "~/composables/useUser";
import {getTagData} from "~/views/demo/page/personal/center/components/data";

const {getUser} = useUser();
const tags = getTagData();
</script>