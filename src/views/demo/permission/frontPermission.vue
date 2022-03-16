<template>
  <PageWrapper :title="$route.meta['title']">
    <template #content>
      <div class="text-secondary text-sm">
        前端权限模式，根据用户的角色信息过滤路由和菜单
      </div>
    </template>
    <el-card shadow="none">
      <PermissionMode/>
      <div v-if="getPermissionMode === PermissionModeEnum.FRONT_MENU">
        <el-divider></el-divider>
        当前角色：{{ getRoles }}
        <el-divider></el-divider>
        角色切换：
        <el-button-group>
          <el-button :type="isSuper ? 'primary' : 'default'" @click="changeRoles(RoleEnum.ADMINISTRATOR)">
            {{ RoleEnum.ADMINISTRATOR }}
          </el-button>
          <el-button :type="isTest ? 'primary' : 'default'" @click="changeRoles(RoleEnum.TEST)">
            {{ RoleEnum.TEST }}
          </el-button>
        </el-button-group>
        <div class="mt-2">
          <el-alert class="mt-2" title="切换用户后，查看左侧菜单和按钮变化" type="info" :closable="false"/>
        </div>
      </div>
      <div v-else>
        <div class="mt-2">
          <el-alert title="请切换权限模式后预览" type="error" :closable="false"/>
        </div>
      </div>
    </el-card>

    <el-card class="mt-2" header="按钮权限" v-if="getPermissionMode === PermissionModeEnum.FRONT_MENU">
      <el-divider content-position="left">指令方式判断权限 v-permission</el-divider>
      <el-space wrap>
        <el-button type="primary" plain v-permission="RoleEnum.ADMINISTRATOR">
          拥有（Administrator）角色可见
        </el-button>
        <el-button type="danger" plain v-permission="RoleEnum.TEST">
          拥有（Test）角色可见
        </el-button>
        <el-button type="success" plain v-permission="[RoleEnum.ADMINISTRATOR,RoleEnum.TEST]">
          拥有（Administrator || Test）任一角色可见
        </el-button>
      </el-space>

      <div class="mt-2">
        <el-alert title="指令方式不能动态修改权限,切换路由后会预览效果" type="info" :closable="false"/>
      </div>

      <el-divider content-position="left">函数方式判断权限 hasPermission</el-divider>
      <el-space wrap>
        <el-button type="primary" plain v-if="hasPermission(RoleEnum.ADMINISTRATOR)">
          拥有（Administrator）角色可见
        </el-button>
        <el-button type="danger" plain v-if="hasPermission(RoleEnum.TEST)">
          拥有（Test）角色可见
        </el-button>
        <el-button type="success" plain v-if="hasPermission([RoleEnum.ADMINISTRATOR,RoleEnum.TEST])">
          拥有（Administrator || Test）任一角色可见
        </el-button>
      </el-space>
    </el-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page";
import {PermissionModeEnum} from '~/enums/permission';
import PermissionMode from './PermissionMode.vue'
import {RoleEnum} from "~/enums/permission";
import {useStore} from "vuex";
import {computed} from "vue";
import {usePermission} from "~/composables/usePermission"

const {getters} = useStore();
const getRoles = computed(() => getters.getRoles);
const isSuper = computed(() => getRoles.value.includes(RoleEnum.ADMINISTRATOR));
const isTest = computed(() => getRoles.value.includes(RoleEnum.TEST));
const {changeRoles, hasPermission, getPermissionMode} = usePermission();
</script>