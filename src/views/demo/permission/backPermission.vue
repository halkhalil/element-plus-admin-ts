<template>
  <PageWrapper :title="$route.meta['title']">
    <template #content>
      <div class="text-secondary text-sm">
        后端权限模式，服务端返回菜单，权限节点<br>
        mock了两组数据， id为1 和 2 具体返回的数据可以在mock/personal.ts内查看<br>
      </div>
    </template>
    <el-card shadow="none">
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
        <el-alert class="mt-2" title="切换用户后，查看左侧菜单和按钮变化" type="info" :closable="false"/>
      </div>
      <div v-else>
        <el-alert class="mt-2" title="请切换权限模式后预览" type="error" :closable="false"/>
      </div>
    </el-card>
    <el-card class="mt-2" header="按钮权限" v-if="getPermissionMode === PermissionModeEnum.BACK_MENU">
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
      <el-alert class="mt-2" title="指令方式不能动态修改权限,切换路由后会预览效果" type="info" :closable="false"/>
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
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page";
import {PermissionModeEnum, PermissionEnum} from '~/enums/permission';
import PermissionMode from './PermissionMode.vue'
import {useStore} from "vuex";
import {computed} from "vue";
import {usePermission} from "~/composables/usePermission"
import {useUser} from "~/composables/useUser";

const mockUsers = [
  {id: 1, username: '用户1', token: 'mockToken1'},
  {id: 2, username: '用户2', token: 'mockToken2'}
];

const {hasPermission, getPermissions, getPermissionMode} = usePermission();
const {getUser} = useUser();
const {dispatch, getters} = useStore();
const permissions = usePermission();

const changeUser = async (item) => {
  await dispatch('user/setToken', item.token);
  await dispatch('user/getUserInfo');
  await dispatch('permission/buildRoutes');
}

const currentUserId = computed(() => {
  return mockUsers.find(item => item.id === getUser.value?.id)?.id;
})
</script>