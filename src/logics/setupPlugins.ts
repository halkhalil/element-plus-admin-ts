import {setupContentment} from "~/logics/plugins/contextmenu";
import {App} from "vue";

export const setupPlugins = (app: App) => {
  setupContentment(app)
}