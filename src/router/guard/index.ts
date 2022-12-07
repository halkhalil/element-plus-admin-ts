import {router} from "~/router";
import {createPageKeepalive} from "~/router/guard/pageKeepalive";
import {createProgressGuard} from "~/router/guard/progressGuard";
import {createPageLoadingGuard} from "~/router/guard/pageLoadingGuard";
import {createPageGuard} from "~/router/guard/pageGuard";
import {createPermissionGuard} from "~/router/guard/permissionGuard";

export function setupRouterGuard() {
  createPageGuard(router);
  createPageKeepalive(router);
  createPageLoadingGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
}