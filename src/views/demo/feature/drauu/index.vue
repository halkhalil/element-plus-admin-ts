<template>
  <PageWrapper :title="$route.meta['title']">
    <template #content>
      <p class="text-sm">
        使用VueUse useDrauu
        <el-link type="primary" href="https://vueuse.org/integrations/useDrauu/" target="_blank">查看</el-link>
      </p>
    </template>
    <svg ref="target" class="h-500px w-500px border-1 border-gray"></svg>
  </PageWrapper>
</template>
<script lang="ts" setup>
import {PageWrapper} from '~/components/Page'
import {useDrauu} from '@vueuse/integrations/useDrauu'
import {ref, toRefs} from "vue";

const target = ref()
const {undo, redo, canUndo, canRedo, brush} = useDrauu(target)
const {color, size} = toRefs(brush)
</script>