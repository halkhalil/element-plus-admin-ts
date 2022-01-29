<template>
  <el-row>
    <el-col>
      <basic-card title="渐变堆叠面积图">
        <div ref="elRef" style="height: 380px;width: 100%;"></div>
      </basic-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {BasicCard} from '~/components/Card'
import {useECharts} from "~/composables/useECharts";
import {getGradientStackedData} from './../data'
import {onMounted} from "vue";

const {elRef, setOptions,echarts} = useECharts();

onMounted(() => {
  setOptions(getGradientStackedData(echarts))
})
</script>

<style scoped>

</style>