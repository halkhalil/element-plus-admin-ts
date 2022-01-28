<template>
  <component :is="componentId"></component>
</template>
<script lang="ts" setup>
import LayoutMix from "~/layouts/LayoutMix.vue";
import LayoutAside from "~/layouts/LayoutAside.vue";
import LayoutTopMenu from "~/layouts/LayoutTopMenu.vue";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {computed} from "vue";

const {getNavbarMode} = useRootSetting();
const componentId = computed(() => {
  let layout;
  switch (getNavbarMode.value) {
    case 'mix':
      layout = LayoutMix;
      break;
    case 'sidebar':
      layout = LayoutAside;
      break;
    case 'top-menu':
      layout = LayoutTopMenu;
      break;
    default:
      layout = LayoutAside;
  }
  return layout;
});

</script>
