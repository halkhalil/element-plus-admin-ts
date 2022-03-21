<template>
  <PageWrapper :title="$route['meta']['title']">
    <template #content>
      flex布局常用类
    </template>
    <el-card shadow="none" class="mb-2">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4" v-for="item in classs" :key="key">
          <div class="bg-gray-50 m-2 p-1">
            <div class="desc">
              <div>class：<code class="text-red-500">.{{ item }}</code></div>
            </div>
            <div class="bg-teal-100 rounded-md p-1 h-30" :class="item">
              <div class="rounded-md bg-red-400 w-6 h-6 m-1"></div>
              <div class="rounded-md bg-green-400 w-6 h-6 m-1"></div>
              <div class="rounded-md bg-blue-400 w-6 h-6 m-1"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page/index'
import {reactive, toRefs} from "vue";

const config = {
  'flex-center': 'flex justify-center items-center',
  'flex-between': 'flex justify-between items-center',
  'flex-col-center': 'flex-center flex-col',
  'flex-col-between': 'flex-between flex-col',
  'flex-x-center': 'flex justify-center',
  'flex-y-center': 'flex justify-center flex-col',
  'flex-x-between':'flex justify-between',
  'flex-y-between':'flex justify-between flex-col',

  'i-flex-center': 'inline-flex justify-center items-center',
  'i-flex-x-center': 'inline-flex justify-center',
  'i-flex-y-center': 'inline-flex items-center',
  'i-flex-col': 'inline-flex flex-col',
  'flex-1-hidden': 'flex-1 overflow-hidden',
}

const classs = reactive(Object.keys(config));
</script>