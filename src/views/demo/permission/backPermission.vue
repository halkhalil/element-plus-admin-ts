<template>
  <page-wrapper :title="$route?.meta?.title">
    <template #content>
      <p class="text-sm">
        后端权限模式，服务端返回菜单，权限节点<br>
        mock了两组数据， id为1 和 2 具体返回的数据可以在mock/personal.ts内查看<br>
      </p>
    </template>
    <el-card shadow="never">
      <PermissionMode/>
      <div v-if="getPermissionMode === PermissionModeEnum.BACK_MENU">
        <el-divider></el-divider>
        当前权限：{{ getPermissions }}
        <el-divider></el-divider>
        <el-button-group>
          <el-button v-for="item in mockUsers"
                     :type="currentUserId === item.id ? 'primary' : 'default'"
                     :disabled="getPermissionMode !== PermissionModeEnum.BACK_MENU"
                     @click="changeUser(item)">
            模拟{{ item.username }}的数据
          </el-button>
        </el-button-group>
        <div class="mt-2">
          <el-alert title="切换用户后，查看左侧菜单和按钮变化" type="info" :closable="false"/>
        </div>
      </div>
      <div v-else>
        <div class="mt-2">
          <el-alert title="请切换权限模式后预览" type="error" :closable="false"/>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" class="mt-2" header="按钮权限" v-if="getPermissionMode === PermissionModeEnum.BACK_MENU">
      <el-divider content-position="left">指令方式判断权限 v-permission</el-divider>
      <el-space wrap>
        <el-button type="primary" plain v-permission="PermissionEnum.USER_LIST">
          拥有（{{ PermissionEnum.USER_LIST }}）权限可见
        </el-button>
        <el-button type="danger" plain v-permission="PermissionEnum.USER_ADD">
          拥有（{{ PermissionEnum.USER_ADD }}）权限可见
        </el-button>
        <el-button type="success" plain v-permission="[PermissionEnum.USER_LIST,PermissionEnum.USER_ADD]">
          拥有（{{ PermissionEnum.USER_LIST }} || {{ PermissionEnum.USER_ADD }}）任一权限可见
        </el-button>
      </el-space>
      <div class="mt-2">
        <el-alert title="指令方式不能动态修改权限,切换路由后会预览效果" type="info" :closable="false"/>
      </div>
      <el-divider content-position="left">函数方式判断权限 hasPermission</el-divider>
      <el-space wrap>
        <el-button type="primary" plain v-if="hasPermission(PermissionEnum.USER_LIST)">
          拥有（{{ PermissionEnum.USER_LIST }}）权限可见
        </el-button>
        <el-button type="danger" plain v-if="hasPermission(PermissionEnum.USER_ADD)">
          拥有（{{ PermissionEnum.USER_ADD }}）权限可见
        </el-button>
        <el-button type="success" plain v-if="hasPermission([PermissionEnum.USER_LIST,PermissionEnum.USER_ADD])">
          拥有（{{ PermissionEnum.USER_LIST }} || {{ PermissionEnum.USER_ADD }}）任一权限可见
        </el-button>
      </el-space>
    </el-card>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page";
import {PermissionModeEnum, PermissionEnum} from '~/enums/permission';
import PermissionMode from './PermissionMode.vue'
import {useStore} from "~/store";
import {computed} from "vue";
import {usePermission} from "~/composables/usePermission"
import {useUser} from "~/composables/useUser";

const mockUsers = [
  {id: 1, username: '用户1', token: 'mockToken1'},
  {id: 2, username: '用户2', token: 'mockToken2'}
];

const {hasPermission, getPermissions, getPermissionMode} = usePermission();
const {getUser} = useUser();
const {userStore, permissionStore} = useStore();
const permissions = usePermission();

const changeUser = async (item) => {
  userStore.setToken(item.token);
  await userStore.fetchUserInfo();
  await permissionStore.buildRoutes();
}

const currentUserId = computed(() => {
  return mockUsers.find(item => item.id === userStore.getUser.value?.id)?.id;
})
</script>