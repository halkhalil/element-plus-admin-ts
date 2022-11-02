<template>
  <el-tabs v-model="activeGroup"
           :tab-position="getIsMobile ? 'top' : 'left'"
           @tab-change="tabChange">
    <el-tab-pane v-for="(item,index) in getConfigGroups"
                 :key="index"
                 :label="item.label"
                 :name="item.value"
                 :lazy="activeGroup !== item.value">
      <edit-group/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import EditGroup from "~/views/system/configs/components/EditGroup.vue";
import {useConfig} from "~/composables/config/useConfig";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {computed, provide} from "vue";
import {useFetchConfigGroupResources} from "~/api/config";

const {getConfigGroups} = useConfig();
const {getIsMobile} = useRootSetting();
const activeGroup = computed(() => getConfigGroups.value[0]?.value);

const apiResources = useFetchConfigGroupResources();
const {fetchLists} = apiResources;
const tabChange = (name) => fetchLists({params: {group: name}});

provide('apiResources', apiResources);
</script>