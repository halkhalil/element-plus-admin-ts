<template>
  <PageWrapper>
    <template #header>
      <UserInfo/>
    </template>
    <el-card shadow="none">
      <el-tabs v-model="active">
        <el-tab-pane label="文章" name="article" :lazy="true">
          <Article/>
        </el-tab-pane>
        <el-tab-pane label="任务" name="task" :lazy="true">
          <Task/>
        </el-tab-pane>
        <el-tab-pane label="项目" name="project" :lazy="true">
          <Project/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page";
import Article from "~/views/demo/page/personal/center/Article.vue";
import Task from "~/views/demo/page/personal/center/Task.vue";
import UserInfo from "~/views/demo/page/personal/center/UserInfo.vue";
import Project from "./Project.vue";
import {ref} from "vue";

const active = ref('article');

</script>