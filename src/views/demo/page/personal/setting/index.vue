<template>
  <page-wrapper :title="$route?.meta?.title">
    <el-tabs :tab-position="getIsMobile ? 'top' : 'left'" v-model="tabActive">
      <el-tab-pane v-for="item in tabs" :label="item.label" :name="item.value" :key="item.value">
        <component :is="item.component"/>
      </el-tab-pane>
    </el-tabs>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page/index.ts'
import BaseSetting from "./components/BasicSetting.vue";
import SecureSetting from "./components/SecureSetting.vue";
import AccountBind from "./components/AccountBind.vue";
import MsgNotify from "./components/MsgNotify.vue";
import {reactive, ref} from "vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";

const tabActive = ref('1');
const {getIsMobile} = useRootSetting();
const tabs = reactive([
  {label: '基本设置', value: '1', component: BaseSetting},
  {label: '安全设置', value: '2', component: SecureSetting},
  {label: '账户绑定', value: '3', component: AccountBind},
  {label: '消息通知', value: '4', component: MsgNotify},
])
</script>