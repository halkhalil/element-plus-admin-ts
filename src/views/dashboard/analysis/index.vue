<template>
  <div>
    <GrowCard/>
    <VisitCard/>
    <el-row :gutter="10">
      <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
        <AreaStackGradientChart/>
      </el-col>
      <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
        <BarPolarStackChart/>
      </el-col>
      <el-col :xl="8" :lg="8" :md="12" :sm="12" :xs="24">
        <FunnelChart/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import GrowCard from './components/GrowCard.vue'
import VisitCard from "./components/VisitCard.vue";
import AreaStackGradientChart from "./components/AreaStackGradientChart.vue";
import BarPolarStackChart from "./components/BarPolarStackChart.vue";
import FunnelChart from "./components/FunnelChart.vue";
</script>