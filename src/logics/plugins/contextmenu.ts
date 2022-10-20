import contextmenu from 'v-contextmenu'
import "v-contextmenu/dist/themes/default.css";
import {App} from "vue";

export function setupContentment(app:App) {
  app.use(contextmenu)
}
