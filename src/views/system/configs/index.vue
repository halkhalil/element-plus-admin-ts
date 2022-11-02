<template>
  <page-wrapper>
    <template #page-header>
      <el-radio-group v-model="mode">
        <el-radio-button label="groups">分组模式</el-radio-button>
        <el-radio-button label="lists">列表模式</el-radio-button>
      </el-radio-group>
    </template>
    <template #extra>
      <el-button type="primary" :disabled="mode === 'groups'" @click="handleAdd">新增</el-button>
    </template>
    <table-list v-if="mode === 'lists'"></table-list>
    <group-list v-if="mode === 'groups'"></group-list>
  </page-wrapper>

</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page/index.ts";
import TableList from "~/views/system/configs/components/TableList.vue";
import GroupList from "~/views/system/configs/components/GroupList.vue";
import {ref} from "vue";

const mode = ref('groups');
const tableListRef = ref(null);

const handleAdd = () => tableListRef.value.addItem();
</script>