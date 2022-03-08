<template>
  <el-card>
    <el-row :gutter="10">
      <el-col :span="10">
        <div class="flex-col between">
          <span class="label text-sm">{{ title }}</span>
          <h1 class="my-2 text-xl font-bold">{{ transitionValue.toFixed() }}</h1>
          <span class="label truncate text-sm">{{ description }}</span>
        </div>
      </el-col>
      <el-col :span="14">
        <div ref="elRef" style="width: 100%;height: 80px;"></div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import {useTransition} from '@vueuse/core'
import {onMounted, ref} from "vue";
import {useECharts} from "~/composables/useECharts";

const props = defineProps({
  title: String,
  notice: String,
  description: String,
  chartOption: Object,
  chartStyle: Object,
  options: Object,
  value: Number,
});

const duration = 1000;
const baseValue = ref(0);
const transitionValue = useTransition(baseValue, {duration})
const {elRef, setOptions} = useECharts();

onMounted(() => {
  setOptions(props.chartOption);
  baseValue.value = props.value as number;
})
</script>
<style lang="scss" scoped>
.label {
  color: var(--el-color-info);
}
</style>