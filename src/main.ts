import {createApp} from "vue";
import App from "./App.vue";
import {router, setupRouter} from '~/router'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'virtual:windi.css'
import 'virtual:svg-icons-register';
import {setupStore} from '~/store'
import {setupRouterGuard} from "~/router/guard";
import {setupGlobalDirectives} from "~/directives";
import {registerGlobComp} from "~/components/registerGlobComp";
import {setupProjectConfig} from "~/logics/setupProjectConfig";
import {setupPlugins} from "~/logics/setupPlugins";

import "~/styles/index.scss";
import 'uno.css'
import "element-plus/theme-chalk/src/message.scss"


(async () => {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  setupRouterGuard();

  setupPlugins(app);

  setupGlobalDirectives(app);

  registerGlobComp(app);

  await setupProjectConfig();

  await router.isReady();

  app.mount('#app')
})();