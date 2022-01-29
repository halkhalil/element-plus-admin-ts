<template>
  <el-row :gutter="10">
    {{customNumber}}
    <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-for="(item,index) in growData" :key="index" class="mb-2">
      <BasicCard :title="item.title" :notice="item.notice">
        <el-row :gutter="10">
          <el-col :span="10">{{ item.transitionValue }}</el-col>
          <el-col :span="14">
            <div :ref="item.elRef" :style="item.chartStyle"></div>
          </el-col>
        </el-row>
        <template #footer>{{ item.description }}</template>
      </BasicCard>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {BasicCard} from "~/components/Card";
import {useTransition} from '@vueuse/core'
import {onMounted, ref} from "vue";
import {useECharts} from "~/composables/useECharts";
import {getGrowData, GrowCardItem} from "~/views/dashboard/analysis/data";

const duration = 500;
const baseNumber = ref(0);
const customNumber = useTransition(baseNumber, {duration})

const growData: GrowCardItem[] = getGrowData().map(item => {
  const {elRef, setOptions} = useECharts();
  const transitionValue = useTransition(ref(item.value), {duration})
  return {...item, ...{elRef, setOptions, transitionValue}} as GrowCardItem;
})

onMounted(() => {
  growData.forEach((item: GrowCardItem) => {
    console.log(item)
    item.setOptions!(item.chartOption)
  })
})
</script>
