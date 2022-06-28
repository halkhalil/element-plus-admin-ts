<template>
  <div @click="toggleDark()">
    <i inline-flex i="dark:ep-moon ep-sunny" />
  </div>
</template>
<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
