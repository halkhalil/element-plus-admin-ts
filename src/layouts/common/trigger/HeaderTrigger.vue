<template>
  <div class="flex items-center" @click="toggleCollapsed">
    <el-icon :size="18">
      <Icon :icon="getCollapsed ? 'ep:expand' : 'ep:fold'"/>
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import {useMenuSetting} from '~/composables/setting/useMenuSeeting'

const {getCollapsed, toggleCollapsed} = useMenuSetting();
</script>