<template>
  <LayoutFeature />
  <component :is="componentId"></component>
</template>
<script lang="ts" setup>
import LayoutMix from "~/layouts/bak/LayoutMix.vue";
import LayoutAside from "~/layouts/bak/LayoutAside.vue";
import LayoutTopMenu from "~/layouts/bak/LayoutTopMenu.vue";
import LayoutFeature from '../common/feature/index.vue';
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
