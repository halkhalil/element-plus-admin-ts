<template>
  <PageWrapper :title="$route['meta']['title']">
    <template #content>
      flex布局常用类
    </template>
    <el-card shadow="none" class="mb-2">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4" v-for="item in classs" :key="key">
          <div class="wrap">
            <div class="desc">
              <div>class：<code>.{{ item }}</code></div>
            </div>
            <div class="box" :class="item">
              <div class="item">1</div>
              <div class="item">2</div>
              <div class="item">3</div>
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
  'flex-col-between': 'flex-center flex-between',
  'flex-x-center': 'flex justify-center',
  'flex-x-between': 'flex justify-between',
  'flex-y-center': 'flex items-center',
  'flex-y-between': 'flex content-center items-center',
  'flex-col-stretch': 'b-flex-col items-stretch',
  'i-flex-center': 'inline-flex justify-center items-center',
  'i-flex-x-center': 'inline-flex justify-center',
  'i-flex-y-center': 'inline-flex items-center',
  'b-flex-col': 'flex flex-col',
  'i-flex-col': 'inline-flex flex-col',
  'i-flex-col-stretch': 'i-flex-col items-stretch',
  'flex-1-hidden': 'flex-1 overflow-hidden',
}

const classs = reactive(Object.keys(config));
</script>

<style lang="scss" scoped>
code {
  color: red;
  margin-right: 10px;
  min-width: 150px;
}

.wrap {
  padding: 10px 0;

  .box {
    background: #F2F6FC;
    height: 100px;

    .item {
      text-align: center;
      width: 25px;
      height: 25px;
      background: #C0C4CC;
      margin: 5px;
    }
  }
}
</style>