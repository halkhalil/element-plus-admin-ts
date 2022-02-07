<template>
  <el-card header="Throughput">
    <el-row>
      <el-col :xs="24" class="mb-2">
        <div ref="elRef" style="height: 310px;width: 100%;"></div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import {useECharts} from "~/composables/useECharts";
import {getThroughputData} from "./../data";
import {onMounted} from "vue";

const {elRef, setOptions} = useECharts();

onMounted(() => {
  setOptions(getThroughputData());
})

</script>

<style scoped>

</style>