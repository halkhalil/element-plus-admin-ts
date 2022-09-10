<template>
  <el-row>
    <el-col>
      <el-card header="漏斗图" shadow="never">
        <div ref="elRef" style="height: 380px;width: 100%;"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useECharts} from "~/composables/useECharts";
import {getFunnelData} from '../data.ts'
import {onMounted} from "vue";

const {elRef, setOptions} = useECharts();

onMounted(() => {
  setOptions(getFunnelData())
})
</script>