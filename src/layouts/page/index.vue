<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="getTransitionName(route)" mode="out-in">
      <div>
        <keep-alive v-if="getOpenKeepAlive && route.meta.keepalive" :include="tabStore.getCachedTabs">
          <component :is="Component" :key="route.name"/>
        </keep-alive>
        <component v-else :is="Component" :key="route.name"/>
      </div>
    </transition>
  </router-view>
</template>

<script lang="ts" setup name="PageLayout">
import {useTransitionSetting} from "~/composables/setting/useTransitionSeeting";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {_RouteLocationBase} from "vue-router";
import {useStore} from "~/store";

const {tabStore} = useStore();
const {getEnableTransition, getBasicTransition} = useTransitionSetting();
const {getOpenKeepAlive} = useRootSetting();

function getTransitionName(route: _RouteLocationBase) {
  if (!getEnableTransition.value) return null;
  let name: string | null = '';
  if (getOpenKeepAlive) {
    name = route.meta.loaded ? "fade-slide" : null;
  }
  return name || route.meta.transitionName || getBasicTransition.value;
}
</script>
