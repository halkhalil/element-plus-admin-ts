<template>
  <el-row :gutter="10">
    <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" class="mb-2">
      <BasicCard :title="title" :notice="notice">
        <el-row :gutter="10">
          <el-col :span="10">{{ transitionValue }}</el-col>
          <el-col :span="14">
            <div ref="elRef" :style="chartStyle"></div>
          </el-col>
        </el-row>
        <template #footer>{{ description }}</template>
      </BasicCard>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {BasicCard} from "~/components/Card";
import {useTransition} from '@vueuse/core'
import {onMounted, ref, toRefs} from "vue";
import {useECharts} from "~/composables/useECharts";
import {getGrowData, GrowCardItem} from "~/views/dashboard/analysis/data";

const props = defineProps({
  title: String,
  notice: String,
  description: String,
  chartOption: {},
  chartStyle: {},
  options: {}
});

const {chartOption} = toRefs(props);

const duration = 500;
const baseNumber = ref(0);
const transitionValue = useTransition(ref(100), {duration})
const customNumber = useTransition(baseNumber, {duration})
const {elRef, setOptions} = useECharts();


onMounted(() => {
  setOptions(chartOption)
})
</script>
