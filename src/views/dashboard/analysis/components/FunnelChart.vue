<template>
  <el-row>
    <el-col>
      <el-card header="漏斗图">
        <div ref="elRef" style="height: 380px;width: 100%;"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {BasicCard} from '~/components/Card'
import {useECharts} from "~/composables/useECharts";
import {getFunnelData} from '../data.ts'
import {onMounted} from "vue";

export default {
  name: "BarPolarStack",
  components: {BasicCard},
  setup() {
    const {elRef, setOptions} = useECharts();

    onMounted(() => {
      setOptions(getFunnelData())
    })

    return {
      elRef,
    }
  }
}
</script>