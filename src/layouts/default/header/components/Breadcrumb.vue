<template>
  <div class="i-flex-center">
    <el-breadcrumb class="i-flex-center" separator="/">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="index" :to="{path:item.path}">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, Ref, ref, watch} from "vue";
import {useRouter} from "vue-router";

const levelList: Ref = ref([]);
const {currentRoute} = useRouter();

const getBreadcrumb = () => {
  let matched = currentRoute.value.matched.filter(item => item.meta && item.meta['title']);
  levelList.value = matched.filter(item => item.meta && item.meta['title'] && item.meta['breadcrumb'] !== false);
}

watch(currentRoute, () => getBreadcrumb())
onMounted(() => getBreadcrumb());
</script>