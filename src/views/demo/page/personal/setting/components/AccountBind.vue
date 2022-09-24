<template>
  <div class="divide-y border-base">
    <div class="flex justify-between p-2" v-for="(item,index) in secureSettingList" :key="index">
      <div>
        <div class="text-base text-primary font-500">{{ item.label }}</div>
        <div class="text-base text-secondary mt-3">{{ item.description }}</div>
      </div>
      <div class="flex flex-col justify-center">
        <el-button type="text">{{ item.extra }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";

const secureSettingList = reactive([
  {label: 'QQ', value: '1', description: '当前未绑定QQ帐号', extra: '绑定'},
  {label: '微信', value: '2', description: '当前未绑定微信帐号', extra: '绑定'},
  {label: '支付宝', value: '3', description: '当前未绑定支付宝帐号', extra: '绑定'},
  {label: '微博', value: '4', description: '当前未绑定微博帐号', extra: '绑定'},
  {label: 'GitHub', value: '5', description: '当前未绑定GitHub帐号', extra: '绑定'},
])
</script>