<template>
  <div>
    <p>{{ $options }}</p>
    <p class="text-red">CallCenterWorkplace</p>
  </div>
</template>

<script setup lang="ts" name="CallCenterWorkplace">
import {onMounted} from "vue";
import {useRouter} from "vue-router";
const {currentRoute} = useRouter()

onMounted(() => {
  console.log('CallCenterWorkplace')
})

console.log(currentRoute)
</script>

<style scoped>

</style>