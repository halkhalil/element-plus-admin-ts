import {createPinia} from 'pinia'
import type {App} from "vue";
import piniaPersist from 'pinia-plugin-persist'
import {useAppStore} from "~/store/modules/app";
import {useUserStore} from "~/store/modules/user";
import {usePermissionStore} from "~/store/modules/permission";
import {useTabStore} from "~/store/modules/tab";
import {useConfigStore} from "~/store/modules/config";

const store = createPinia();
store.use(piniaPersist)

function setupStore(app: App<Element>) {
  app.use(store);
}

const useStore = () => {
  return {
    appStore: useAppStore(),
    userStore: useUserStore(),
    permissionStore: usePermissionStore(),
    tabStore: useTabStore(),
    configStore: useConfigStore(),
  }
}

export {
  store,
  useStore,
  setupStore,
}