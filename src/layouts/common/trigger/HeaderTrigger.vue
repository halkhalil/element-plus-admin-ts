<template>
  <div class="flex items-center" @click="toggleCollapsed">
    <icon :name="getCollapsed ? 'el-zhankai' : 'el-shouqi'" size="20"/>
  </div>
</template>

<script lang="ts" setup>
import {useMenuSetting} from '~/composables/setting/useMenuSeeting'

const {getCollapsed, toggleCollapsed} = useMenuSetting();
</script>