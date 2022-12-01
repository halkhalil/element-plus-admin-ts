<template>
  <el-card header="Failed Jobs">
    <Table :columns="tableColumn" :data="tableData" size="small">
      <template #action="scope">
        <el-button type="primary">
          <el-icon :size="14">
            <Refresh />
          </el-icon>
        </el-button>
      </template>
    </Table>
  </el-card>
</template>

<script lang="ts" setup>
import {Table} from '~/components'
import {shallowReactive} from "vue";
import {Refresh} from "@element-plus/icons";

const tableColumn = shallowReactive([
  {prop: 'job', label: 'Job', minWidth: 90},
  {prop: 'runtime', label: 'Runtime', minWidth: 70},
  {prop: 'failed_at', label: 'Failed At', minWidth: 110},
  {prop: 'action', label: 'Action', slot: 'action', minWidth: 80},
])

const tableData = shallowReactive([
  {job: 'SendSms', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'SendSms', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'CallTask', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'SendPush', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'Callback', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'Callback', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'SendSms', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'SendSms', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'CallTask', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'SendPush', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'Callback', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
  {job: 'Callback', runtime: '4', failed_at: '10-14 16:23:09', Retry: 'A Few Seconds'},
])
</script>