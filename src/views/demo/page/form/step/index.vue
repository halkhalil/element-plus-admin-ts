<template>
  <page-wrapper :title="$route?.meta?.title" content-background content-full-height>
    <template #content>
      <span class="text-base text-secondary">将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</span>
    </template>
    <div class="p-5">
      <el-row justify="center">
        <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="22">
          <el-steps :active="active" finish-status="success" process-status="process" align-center>
            <el-step v-for="(item,index) in steps"
                     :key="index"
                     :title="item.name"
                     :description="item.description"
            ></el-step>
          </el-steps>
        </el-col>
        <el-col :xs="24" :sm="22" :md="20" :lg="16" :xl="12">
          <div class="mt-5">
            <Step1 v-if="active === 0" @next="handleStepNext"/>
            <Step2 v-if="active === 1" @next="handleStepNext" @prev="handleStepPrev" :preview-info="previewInfo"/>
            <Step3 v-if="active === 2" @redo="handleRedo" :preview-info="previewInfo"/>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="py-5 text-base" v-show="active === 0">
      <el-divider content-position="left">说明</el-divider>
      <div>
        <div class="text-primary font-bold">转账到支付宝账户</div>
        <div class="text-regular text-base py-1">
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </div>
        <div class="text-primary font-bold">转账到银行卡</div>
        <div class="text-regular py-1">
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </div>
      </div>
    </div>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page/index.ts';
import { ref} from "vue";
import Step1 from "~/views/demo/page/form/step/Step1.vue";
import Step2 from "~/views/demo/page/form/step/Step2.vue";
import Step3 from "~/views/demo/page/form/step/Step3.vue";

const steps = ref([
  {name: '填写信息', description: '', status: 'wait'},
  {name: '确认信息', description: '', status: 'wait'},
  {name: '完成', description: '', status: 'wait'},
]);
let previewInfo = ref();
const active = ref(0)
const handleStepNext = (form) => {
  active.value++;
  previewInfo.value = form;
}
const handleStepPrev = () => {
  active.value--;
}
const handleRedo = () => {
  active.value = 0;
}
</script>