<template>
  <el-row>
    <el-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
      <div ref="elRef" style="height: 380px;width: 100%;"></div>
    </el-col>
    <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
      <BaTable :columns="rankColumns" :data="rankLists" size="small"></BaTable>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import {onMounted, shallowReactive} from 'vue';
import {getVisitData, rankColumn, rankData} from './../data';
import {BaTable} from "~/components/Table";
import {useECharts} from "~/composables/useECharts";

const rankLists:object[] = shallowReactive(rankData());
const rankColumns:object[] = shallowReactive(rankColumn());

const {elRef, setOptions} = useECharts();

onMounted(() => {
  setOptions(getVisitData())
})
</script>