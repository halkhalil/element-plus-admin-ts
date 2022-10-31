<template>
  <el-form ref="formRef" :model="dynamicValidateForm" label-width="50px">
    <div >
      <div class="grid grid-cols-2">
        <el-form-item>
          <el-input placeholder="value"/>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="label"/>
        </el-form-item>
      </div>
      <div class="ml-2">
        <el-button @click="addDomain" :icon="Delete"/>

      </div>
    </div>
    <div class="flex justify-end">
      <el-button @click="addDomain" :icon="Plus"/>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance} from 'element-plus'
import {Plus, Delete} from "@element-plus/icons-vue";

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
})

interface DomainItem {
  key: number
  value: string
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>