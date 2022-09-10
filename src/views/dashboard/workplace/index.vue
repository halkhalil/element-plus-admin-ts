<template>
  <div>
    <UserInfo class="mb-2"/>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="16">
        <Project class="mb-2"/>
        <Dynamic class="mb-2"/>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="8">
        <QuickNav class="mb-2"/>
        <Carousel class="mb-2"/>
        <ProjectStatistic class="mb-2"/>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import UserInfo from "~/views/dashboard/workplace/components/UserInfo.vue";
import Project from "~/views/dashboard/workplace/components/Project.vue";
import Dynamic from "~/views/dashboard/workplace/components/Dynamic.vue";
import QuickNav from "~/views/dashboard/workplace/components/QuickNav.vue";
import Carousel from "~/views/dashboard/workplace/components/Carousel.vue";
import ProjectStatistic from "~/views/dashboard/workplace/components/ProjectStatistic.vue";
</script>