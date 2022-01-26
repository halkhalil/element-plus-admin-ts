import {setupPermissionDirective} from "~/directives/permission.ts";
import {setupRoleDirective} from "~/directives/role.js";

export function setupGlobalDirectives(app) {
  setupPermissionDirective(app);
  setupRoleDirective(app);
}