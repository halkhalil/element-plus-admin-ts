<template>
  <div class="flex items-center">
    <el-breadcrumb class="i-flex-center" separator="/">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="index" :to="{path:item.path}">
        {{ t(item.meta.title) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, Ref, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const levelList: Ref = ref([]);
const {currentRoute} = useRouter();
const {t} = useI18n();

const getBreadcrumb = () => {
  let matched = currentRoute.value.matched.filter(item => item.meta && item.meta['title']);
  levelList.value = matched.filter(item => item.meta && item.meta['title'] && item.meta['breadcrumb'] !== false);
}

watch(currentRoute, () => getBreadcrumb())
onMounted(() => getBreadcrumb());
</script>