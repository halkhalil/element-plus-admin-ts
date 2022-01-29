<template>
  <el-card header="项目统计" shadow="none">
    <div ref="elRef" style="height: 380px;width: 100%;"></div>
  </el-card>
</template>

<script lang="ts" setup>
import {useECharts} from "~/composables/useECharts";
import {getFunnelData} from './../data'
import {onMounted} from "vue";
const {elRef, setOptions} = useECharts();

onMounted(() => {
  setOptions(getFunnelData())
})
</script>