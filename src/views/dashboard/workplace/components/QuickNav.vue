<template>
  <el-card header="快捷导航" shadow="never">
    <div class="grid grid-cols-3">
      <div v-for="(item,index) in permissionStore.getMenus" :key="index" class="cursor-pointer">
        <el-card class="card" shadow="hover">
          <div class="flex justify-center items-center flex-col">
            <span class="text-xl mb-2">
              <el-icon :size="20">
                <Icon :icon="item.icon"/>
              </el-icon>
            </span>
            <span>{{ t(item.title) }}</span>
          </div>
        </el-card>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import {useStore} from "~/store";
import {useLocale} from "~/composables/useLocale";

const {permissionStore} = useStore()
const {t} = useLocale()
</script>