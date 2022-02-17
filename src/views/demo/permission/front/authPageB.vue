<template>
  <PageWrapper :title="$route.meta['title']">
    <template #content>
      <div class="text-secondary text-sm">
        前端权限模式，根据用户的角色信息过滤路由和菜单
      </div>
    </template>
    <el-card shadow="none">
      <CurrentPermissionMode/>
      <el-divider></el-divider>
      当前角色：{{ getRoles }}
      <el-divider></el-divider>
      角色切换：
      <el-button-group>
        <el-button :type="isSuper ? 'primary' : 'default'">{{ RoleEnum.ADMINISTRATOR }}</el-button>
        <el-button :type="isTest ? 'primary' : 'default'">{{ RoleEnum.TEST }}</el-button>
      </el-button-group>
    </el-card>

  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from "~/components/Page"
import CurrentPermissionMode from '../CurrentPermissionMode.vue'
import {RoleEnum} from "~/enums/permission";
import {useStore} from "vuex";
import {computed} from "vue";

const {getters} = useStore();
const getRoles: string[] = getters.getRoles;
const isSuper = computed(() => getRoles.includes(RoleEnum.ADMINISTRATOR));
const isTest = computed(() => getRoles.includes(RoleEnum.TEST));
</script>

<style scoped>

</style>