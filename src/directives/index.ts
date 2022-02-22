import {setupPermissionDirective} from "~/directives/permission";
import {App} from "vue";

export function setupGlobalDirectives(app: App) {
  setupPermissionDirective(app);
}