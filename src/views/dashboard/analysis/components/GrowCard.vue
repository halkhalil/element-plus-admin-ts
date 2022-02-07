<template>
  <el-row :gutter="10">
    <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-for="(item,index) in growData" :key="index" class="mb-2">
      <GrowCardItem :title="item.title"
                    :nonce="item.notice"
                    :value="item.value"
                    :description="item.description"
                    :chartOption="item.chartOption"/>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import GrowCardItem from "./GrowCardItem.vue";
import {getGrowData} from "~/views/dashboard/analysis/data";

const growData = getGrowData();
</script>
