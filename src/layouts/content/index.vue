<template>
  <div v-loading="getOpenPageLoading && getPageLoading">
    <Content/>
  </div>
</template>

<script>
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting.ts";
import {useRootSetting} from "~/composables/setting/useRootSeeting.ts";
import Content from "~/layouts/content/Content.vue";

export default {
  name: "LayoutContent",
  components:{Content},
  setup() {
    const {getOpenPageLoading} = useTransitionSetting();
    const {getPageLoading} = useRootSetting();

    return {
      getOpenPageLoading,
      getPageLoading,
    }
  }
}
</script>
