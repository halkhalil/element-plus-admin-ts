<template>
  <el-icon :size="18" @click="toggleDark()">
    <i i="dark:ep-moon ep-sunny"/>
  </el-icon>
</template>
<script lang="ts" setup>
import {useDark, useToggle} from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
