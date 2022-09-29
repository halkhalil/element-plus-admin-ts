<template>
  <el-descriptions :column="1" border>
    <el-descriptions-item label="付款账户">{{ info.payment_account }}</el-descriptions-item>
    <el-descriptions-item label="支付方式">{{ info.payment_method }}</el-descriptions-item>
    <el-descriptions-item label="收款账户">{{ info.collection_account }}</el-descriptions-item>
    <el-descriptions-item label="收款人">{{ info.payee }}</el-descriptions-item>
    <el-descriptions-item label="转账金额">{{ info.amount }}</el-descriptions-item>
  </el-descriptions>
  <el-form ref="formRef" :model="form" :rules="rules" class="mt-5" autocomplete="off">
    <el-form-item label="支付密码" prop="password">
      <el-input v-model="form.password" show-password></el-input>
    </el-form-item>
    <div class="flex-row center">
      <el-button type="default" @click="handlePrev">上一步</el-button>
      <el-button type="primary" @click="handleNext(formRef)" :loading="loading">下一步</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref, toRefs} from "vue";
import {useTimeoutFn} from '@vueuse/core'
import {FormInstance, FormRules} from "element-plus";

const emits = defineEmits(['next', 'prev'])
const props = defineProps({
  previewInfo: {
    type: Object,
    default: () => ({})
  }
})

const formRef = ref<FormInstance>();
const form = reactive({
  password: ''
})
const rules = reactive<FormRules>({
  password: [{required: true, trigger: 'blur', message: '请输入支付密码'}]
})
const {previewInfo: info} = toRefs(props);
const loading = ref<boolean>(false);

const handlePrev = () => {
  emits('prev')
}
const handleNext = (formRef: FormInstance) => {
  formRef.validate(valid => {
    if (valid) {
      loading.value = true;
      useTimeoutFn(() => {
        loading.value = false;
        emits('next', props.previewInfo)
      }, 1000)
    }
  })
}
</script>