<template>
  <div class="config-wrap">
    <el-tabs type="border-card" v-model="mode">
      <el-tab-pane label="分组渲染" name="groups" :lazy="mode !== 'groups'">
        <group-list/>
      </el-tab-pane>
      <el-tab-pane label="列表渲染" name="lists" :lazy="mode !== 'lists'">
        <table-list/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import TableList from "~/views/system/configs/components/TableList.vue";
import GroupList from "~/views/system/configs/components/GroupList.vue";
import {ref} from "vue";

const mode = ref('groups');
</script>
<style lang="scss">
.config-wrap {
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }
}
</style>