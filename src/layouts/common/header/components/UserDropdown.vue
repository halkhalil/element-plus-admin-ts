<template>
  <div>
    <el-dropdown size="small" trigger="click">
      <div class="avatar flex-center">
        <el-avatar :size="30" :src="getUser['avatar']">{{ getUser['nickname'] }}</el-avatar>
        <div class="flex-center pl-1">
          <span class="text-sm">{{ getUser['nickname'] }}</span>
          <icon name="el-down" class="ml-1" :size="12"/>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <icon name="el-user" :size="14" class="mr-1"/>
            个人中心
          </el-dropdown-item>
          <el-dropdown-item>
            <icon name="el-setting" :size="14" class="mr-1"/>
            个人设置
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            <icon name="el-logout" :size="14" class="mr-1"/>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import {useUser} from "~/composables/useUser";
import {useStore} from "vuex";

const {getUser} = useUser();
const {dispatch} = useStore()

const logout = async () => {
  await dispatch('user/logout');
  location.reload();
}
</script>
<style lang="scss" scoped>
.container {
  .avatar {
    height: 49px;

    //.name {
    //  color: var(--el-text-color-primary);
    //  padding-left: 5px;
    //  width: max-content;
    //  max-width: 80px;
    //  @extend .text-overflow-1 !optional;
    //}

    .el-avatar {
      -webkit-transform: scale(0.85);
      background: #409EFF;
      font-weight: bolder;
    }
  }
}
</style>