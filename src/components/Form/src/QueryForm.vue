<template>
  <div class="flex justify-between">
    <div class="w-400px">
      <el-input v-model="query" placeholder="输入关键字按下回车进行搜索">
        <template #prepend>
          <el-select v-model="select" placeholder="Select" style="width: 100px;">
            <el-option label="用户标识" value="user_id"/>
            <el-option label="用户姓名" value="username"/>
            <el-option label="用户昵称" value="nickname"/>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="advanced=!advanced"/>
        </template>
      </el-input>
    </div>
    <div>
      <slot name="extra">
        <el-button>新增</el-button>
      </slot>
    </div>
  </div>
  <div v-show="advanced">
    <el-divider>高级搜索</el-divider>
    <BasicForm :schemas="querySchemas" show-label :colProps="{xs: 24, sm: 12, md: 12, lg: 8, xl: 6}"></BasicForm>
  </div>
</template>

<script lang="ts" setup>
import BasicForm from './Form.vue'
import {Search, Edit} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";

const query = ref();
const select = ref('user_id')
const advanced = ref(false);

const querySchemas = [
  {field: 'id', placeholder: '用户ID', component: 'Input'},
  {field: 'username', placeholder: '用户名', component: 'Input'},
  {field: 'nickname', placeholder: '昵称', component: 'Input'},
];

const advancedSearch = () => {
}
</script>