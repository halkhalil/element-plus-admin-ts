<template>
  <div class="login flex justify-center items-center">
    <el-form ref="formElRef" size="large" :model="form" :rules="rules" class="max-w-90% translate-y--20">
      <el-row>
        <el-col>
          <h3 class="title">{{ title }}</h3>
        </el-col>
        <el-col>
          <el-form-item prop="username">
            <el-input v-model="form.email" placeholder="Username">
              <template #prefix>
                <el-icon :size="15">
                  <Icon icon='ep:user'/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="username">
            <el-input v-model="form.password" placeholder="Password" show-password>
              <template #prefix>
                <el-icon :size="15">
                  <Icon icon='ep:lock'/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button class="w-full" :loading="loading" type="primary" @click="login(formElRef)">登 录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {RouteLocationRaw, useRouter} from "vue-router";
import {FormInstance} from "element-plus";
import {useStore} from "~/store";

const title = import.meta.env.VITE_TITLE;
const formElRef = ref<FormInstance>()
const form = reactive({email: 'admin@shiwuhao.com', password: '111111'})
const rules = reactive({
  email: [{required: true, trigger: 'blur'}],
  password: [{required: true, trigger: 'blur'}]
})
const loading = ref(false)
const {push, currentRoute} = useRouter();
const {userStore} = useStore();

const login = async (formEl: FormInstance) => {
  formEl?.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      await userStore.fetchLogin(form);
      if (userStore.getToken) {
        const {query: {redirect, ...otherQuery}} = currentRoute.value;
        await push({path: redirect || '/', query: {...otherQuery}} as RouteLocationRaw);
        loading.value = false;
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background: #283443;

  :deep(.el-input__wrapper) {
    background: transparent;
    border: 1px solid #283443;
    -webkit-appearance: none;
    color: white;
    caret-color: white;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }

  :deep(.el-input__inner) {
    color: white;
  }

  .title {
    font-size: 26px;
    color: white;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
