<template>
  <PageWrapper content-full-height :title="$route?.meta?.title">
    <template #extra>
      <el-button @click="treeToggleExpand">{{ !expandAll ? '节点展开' : '节点收起' }}</el-button>
    </template>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="4" class="mb-2">
        <el-card shadow="never" style="height: 100%;">
          <el-tree default-expand-all
                   highlight-current
                   node-key="type"
                   :expand-on-click-node="false"
                   current-node-key="all"
                   :highlight-current="true"
                   :check-strictly="false"
                   :data="types"
                   :props="{children: 'children',label:'label'}"
                   @node-click="nodeSelectType"></el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="20" :xl="20" class="mb-2">
        <el-card shadow="never">
          <el-tree ref="treeRef"
                   :default-expand-all="expandAll"
                   :props="{children: 'children',label:treeShowLabel,class:treeShowClass}"
                   :data="treePermissions"
                   default-expand-all
                   node-key="id"
                   :draggable="true"
                   @node-drop="nodeDrop">
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components"
import {onMounted, ref, computed, reactive} from "vue";
import {fetchUpdate} from '~/api/permissions'
import {useFetchPermissions} from "~/api/useFetchAll";
import {listToTree} from "~/utils/helper/treeHelper";
import type {ElTree} from "element-plus";

const expandAll = ref(true)
const types = ref([
  {
    type: 'all',
    label: '全部节点',
    children: [
      {type: 'menus', label: '菜单节点'},
      {type: 'actions', label: '动作节点'}
    ]
  },
])

const params = reactive({type: ''});
const treeRef = ref<InstanceType<typeof ElTree>>()
const {data: permissions, execute: fetchTree} = useFetchPermissions(params);
const treePermissions = computed(() => listToTree(permissions.value?.data || []))
const treeShowLabel = ({permissible}) => permissible.label;
const treeShowClass = (data, {level}) => level === 2 ? 'is-penultimate' : null;

// 权限树展开收起
const treeToggleExpand = () => {
  expandAll.value = !expandAll.value;
  Object.keys(treeRef.value!.store.nodesMap).forEach(key => treeRef.value!.store.nodesMap[key].expanded = expandAll.value);
}
// 拖拽成功完事件
const nodeDrop = ({data: {id: draggingId}}, {data: {id: dropId}}, dropType) => {
  fetchUpdate({id: draggingId, dropId, dropType})
}
// 节点类型选择事件
const nodeSelectType = ({type}) => {
  params.type = type;
  fetchTree();
}

onMounted(() => {
  fetchTree();
})

</script>