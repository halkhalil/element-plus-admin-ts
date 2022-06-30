<template>
  <el-card header="快捷导航" shadow="none">
    <div class="grid grid-cols-3">
      <div v-for="(item,index) in getMenus" :key="index" class="cursor-pointer">
        <el-card class="card" shadow="hover">
          <div class="flex justify-center items-center flex-col">
            <span class="text-xl mb-2"><icon :name="item.icon" :style="{color:item.color}" :size="20" /></span>
            <span>{{ item.title }}</span>
          </div>
        </el-card>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import {useLayoutMenus} from "~/layouts/common/menu/useLayoutMenus";

const {getMenus} = useLayoutMenus()
</script>