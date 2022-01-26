import 'element-plus/es/components/slider/style/css'
import 'element-plus/es/components/cascader/style/css'
import "element-plus/theme-chalk/src/message.scss"
import store from '~/store'
import {ProjectConfig} from "~/enums/config";
import type {App} from "vue";

const setupProjectConfig = async () => {
  const {getters, dispatch} = store;
  if (!getters.getProjectConfig) {
    await dispatch('app/setProjectConfig', ProjectConfig)
  }
}

export async function setupElementPlus(app: App<Element>) {
  await setupProjectConfig();
  const size = store.getters.getProjectConfig.size ?? 'small';
  app.config.globalProperties.$ELEMENT = {size: size, zIndex: 3000}
}
