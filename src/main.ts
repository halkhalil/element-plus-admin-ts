import {createApp} from "vue";
import App from "./App.vue";
import {router, setupRouter} from '~/router'
import 'virtual:svg-icons-register';
import {setupStore} from '~/store'
import {setupRouterGuard} from "~/router/guard";
import {setupGlobalDirectives} from "~/directives";
import {setupProjectConfig} from "~/logics/setupProjectConfig";
import {setupPlugins} from "~/logics/setupPlugins";
import {setupI18n} from "~/./locales";

import 'uno.css'
import "~/styles/index.scss";
import "element-plus/theme-chalk/src/message.scss"


(async () => {
  const app = createApp(App);

  setupStore(app);

  setupProjectConfig();

  await setupI18n(app);

  setupRouter(app);

  setupRouterGuard();

  setupPlugins(app);

  setupGlobalDirectives(app);

  await router.isReady();

  app.mount('#app')
})();