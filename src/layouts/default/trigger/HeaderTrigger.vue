<template>
  <div class="container flex-col center" @click="toggleCollapsed">
    <icon :name="getCollapsed ? 'el-zhankai' : 'el-shouqi'" size="20"/>
  </div>
</template>

<script lang="ts" setup>
import {useMenuSetting} from '~/composables/setting/useMenuSeeting'

const {getCollapsed, toggleCollapsed} = useMenuSetting();
</script>
<style lang="scss" scoped>
.container {
  height: 49px;
  padding: 0 10px;
}
</style>
