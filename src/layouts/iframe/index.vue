<template>
  <div class="h-full" v-loading="loading">
    <iframe class="wh-full" :src="currentRoute?.meta?.frameSrc" @load="hideLoading"></iframe>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";

const {currentRoute} = useRouter();
const loading = ref(true);
const hideLoading = () => loading.value = false;
</script>
