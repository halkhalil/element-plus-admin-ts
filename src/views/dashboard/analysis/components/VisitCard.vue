<template>
  <el-row :gutter="10" class="mb-2">
    <el-col :span="24">
      <el-card shadow="never">
        <el-tabs v-model="activeName">
          <el-tab-pane label="销售额" name="first" :lazy="true">
            <Sale/>
          </el-tab-pane>
          <el-tab-pane label="访问量" name="second" :lazy="true">
            <Sale/>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import Sale from "~/views/dashboard/analysis/components/Sale.vue";

const activeName = ref('first');
</script>