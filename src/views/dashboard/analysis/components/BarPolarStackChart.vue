<template>
  <el-row>
    <el-col>
      <el-card header="极坐标系下的堆叠柱状图">
        <div ref="elRef" style="height: 380px;width: 100%;"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useECharts} from "~/composables/useECharts";
import {getBarPolarStack} from './../data'
import {onMounted} from "vue";

const {elRef, setOptions} = useECharts();
onMounted(() => {
  setOptions(getBarPolarStack())
})
</script>