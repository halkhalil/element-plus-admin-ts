<template>
  <el-row>
    <el-col>
      <el-card header="渐变堆叠面积图" shadow="never">
        <div ref="elRef" style="height: 380px;width: 100%;"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useECharts} from "~/composables/useECharts";
import {getGradientStackedData} from './../data'
import {onMounted} from "vue";

const {elRef, setOptions, echarts} = useECharts();

onMounted(() => {
  setOptions(getGradientStackedData(echarts))
})
</script>