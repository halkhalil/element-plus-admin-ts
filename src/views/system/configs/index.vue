<template>
  <page-wrapper>
    <template #page-header>
      <el-radio-group v-model="mode">
        <el-radio-button label="group">分组模式</el-radio-button>
        <el-radio-button label="list">列表模式</el-radio-button>
      </el-radio-group>
    </template>
    <template #extra>
      <el-button type="primary" :disabled="mode === 'group'" @click="handleAdd">新增</el-button>
    </template>
    <table-list ></table-list>
<!--    <group-list v-if="mode === 'config'"></group-list>-->
  </page-wrapper>

</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page/index.ts";
import TableList from "~/views/system/configs/TableList.vue";
import GroupList from "~/views/system/configs/GroupList.vue";
import {ref} from "vue";

const mode = ref('group');
const tableListRef = ref(null);

const handleAdd = () => tableListRef.value.addItem();
</script>