<template>
  <div>
    <el-result
      icon="success"
      title="操作成功"
      sub-title="预计两小时到账"
    >
      <template #extra>
        <div class="flex-row center">
          <el-button type="primary" size="medium" @click="handleRedo">再转一笔</el-button>
          <el-button type="default" size="medium">查看账单</el-button>
        </div>
      </template>
    </el-result>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="付款账户">{{ info.payment_account }}</el-descriptions-item>
      <el-descriptions-item label="支付方式">{{ info.payment_method }}</el-descriptions-item>
      <el-descriptions-item label="收款账户">{{ info.collection_account }}</el-descriptions-item>
      <el-descriptions-item label="收款人">{{ info.payee }}</el-descriptions-item>
      <el-descriptions-item label="转账金额">{{ info.amount }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import {toRefs} from "vue";

const emits = defineEmits(['redo'])
const props = defineProps({
  previewInfo: {
    type: Object,
    default: () => ({})
  }
})

const {previewInfo: info} = toRefs(props);
const handleRedo = () => emits('redo')
</script>