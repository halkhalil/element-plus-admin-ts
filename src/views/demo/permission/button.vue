<template>
  <PageWrapper :title="$route.meta['title']">
    <template #content>
      指令方式：v-permission, v-role<br>
      函数方式：hasPermission, hasRole<br>
    </template>

    <UserPermissions/>

    <el-card class="mt-2">
      <el-divider content-position="left">指令方式判断权限 v-permission</el-divider>
      <el-row :gutter="10">
        <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-permission="'User:store'">
          <el-button type="primary">
            添加用户：拥有（User:store）节点可见
          </el-button>
        </el-col>
        <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-permission="'User:destroy'">
          <el-button type="danger">
            删除用户：拥有（User:destroy）节点可见
          </el-button>
        </el-col>
        <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-permission="['User:store','User:destroy']">
          <el-button type="success">
            拥有（User:store || User:destroy）任一节点可见
          </el-button>
        </el-col>
      </el-row>

      <el-divider content-position="left">函数方式判断权限 hasPermission</el-divider>
      <el-row :gutter="10">
        <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-if="hasPermission('User:store')">
          <el-button type="primary">
            添加用户：拥有（User:store）节点可见
          </el-button>
        </el-col>
        <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-if="hasPermission('User:destroy')">
          <el-button type="danger">
            删除用户：拥有（User:destroy）节点可见
          </el-button>
        </el-col>
        <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-if="hasPermission(['User:store','User:destroy'])">
          <el-button type="success">
            拥有（User:store || User:destroy）任一节点可见
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </PageWrapper>
</template>
<style lang="scss" scoped>
.el-button {
  width: 100%;
  margin: 5px 0;
}
</style>
<script lang="ts" setup>
import UserPermissions from "~/views/demo/permission/UserPermissions.vue";
import {PageWrapper} from "~/components/Page"
import {usePermission} from "~/composables/usePermission";

const {hasPermission} = usePermission();
</script>

