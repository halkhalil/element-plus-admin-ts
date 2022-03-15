import {setupContentment} from "~/logics/plugins/contextmenu";
import {App} from "vue";

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

export const setupPlugins = (app: App) => {
  setupContentment(app)
  // app.use(ElementPlus)
}