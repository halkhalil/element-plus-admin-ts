<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px"
           :label-position="getIsMobile ? 'top' : 'right'">
    <el-form-item label="付款账户" prop="payment_account">
      <el-select v-model="form.payment_account" placeholder="请选择付款账户" class="w-full">
        <el-option label="element-plus-admin@alipay.com" value="element-plus-admin@alipay.com"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="收款账户" prop="collection_account">
      <el-input v-model="form.collection_account">
        <template #prepend>
          <el-select v-model="form.payment_method" style="width: 100px;">
            <el-option label="支付宝" value="alipay"></el-option>
            <el-option label="微信" value="wxpay"></el-option>
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="收款人姓名" prop="payee">
      <el-input v-model="form.payee"></el-input>
    </el-form-item>
    <el-form-item label="转账金额" prop="amount">
      <el-input v-model="form.amount"></el-input>
    </el-form-item>
    <div class="flex-row center">
      <el-button type="primary" @click="handleNext(formRef)">下一步</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {FormInstance, FormRules} from "element-plus";

const emits = defineEmits(['next']);
const formRef = ref<FormInstance>();
const form = reactive({
  payment_account: '',
  collection_account: 'test@example.com',
  payment_method: 'alipay',
  payee: 'shiwuhao',
  amount: 500,
})

const rules = reactive<FormRules>({
  payment_account: [{required: true, trigger: 'change', message: '请选择付款账户'}],
  collection_account: [{required: true, trigger: 'blur', message: '请输入收款账户'}],
  payment_method: [{required: true, trigger: 'change', message: '请选择付款方式'}],
  payee: [{required: true, trigger: 'blue', message: '请输入收款人姓名'}],
  amount: [{required: true, trigger: 'blue', message: '请输入收款金额'}],
})

const handleNext = (formRef: FormInstance) => {
  formRef.validate(valid => {
    if (valid) {
      emits('next', form)
    }
  })
}
const {getIsMobile} = useRootSetting();
</script>