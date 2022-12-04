<template>
  <PageWrapper content-full-height>
    <el-tabs v-model="activeGroup"
             :tab-position="getIsMobile ? 'top' : 'left'"
             class="pt-3"
             @tab-change="tabChange">
      <el-tab-pane v-for="(item,index) in getConfigGroups"
                   :key="index"
                   :label="item.label"
                   :name="item.value"
                   :lazy="activeGroup !== item.value">
        <edit-group/>
      </el-tab-pane>
    </el-tabs>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components';
import EditGroup from "~/views/routine/configs/components/EditGroup.vue";
import {useConfig} from "~/composables/config/useConfig";
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {provide, ref} from "vue";
import {useFetchConfigGroupResources} from "~/api/config";

const {getConfigGroups} = useConfig();
const {getIsMobile} = useRootSetting();
const activeGroup = ref('basic');

const apiResources = useFetchConfigGroupResources();
const {fetchLists} = apiResources;
const tabChange = (name) => fetchLists({params: {group: name}});

provide('apiResources', apiResources);
</script>