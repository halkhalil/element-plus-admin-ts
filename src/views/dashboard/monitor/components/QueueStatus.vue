<template>
  <el-card header="Queue Status">
    <div class="grid col-auto md:grid-cols-2 lg:grid-cols-4">
      <el-card class="card" shadow="hover" v-for="(item,index) in queueStatus" :key="index">
        <div class="flex-col-center">
          <span class="text-sm text-gray-500 line-clamp-1">{{ item.label }}</span>
          <span class="text-xl mt-1">{{ item.value }}</span>
        </div>
      </el-card>
    </div>
    <div class="mt-2">
      <BasicTable :columns="tableColumn" :data="tableData"></BasicTable>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import {BasicTable} from '~/components/Table'
import {shallowReactive} from "vue";

const tableColumn = shallowReactive([
  {prop: 'queue', label: 'Queue', minWidth: 100},
  {prop: 'processes', label: 'Processes', minWidth: 80},
  {prop: 'jobs', label: 'Jobs', minWidth: 100},
  {prop: 'wait', label: 'Wait', minWidth: 120},
]);

const tableData = shallowReactive([
  {queue: 'default', processes: '4', jobs: 1000, wait: 'A Few Seconds'},
  {queue: 'hot', processes: '5', jobs: 5000, wait: 'A Few Seconds'},
  {queue: 'promotion', processes: '6', jobs: 1000, wait: 'A Few Seconds'},
  {queue: 'first', processes: '8', jobs: 2000, wait: 'A Few Seconds'},
  {queue: 'second', processes: '8', jobs: 2000, wait: 'A Few Seconds'},
])

const queueStatus = shallowReactive([
  {label: 'JOBS PER MINUTE', value: 117},
  {label: 'JOBS PAST HOUR', value: '5,808'},
  {label: 'FAILED JOBS', value: '701'},
  {label: 'STATUS', value: 'Active'},
  {label: 'TOTAL PROCESSES', value: '14'},
  {label: 'MAX WAIT TIME', value: '--'},
  {label: 'MAX RUNTIME', value: 'First'},
  {label: 'MAX THROUGHPUT', value: 'First'},
])
</script>