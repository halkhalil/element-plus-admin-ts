import {usePermission} from "~/composables/usePermission";
import {App, Directive, DirectiveBinding} from "vue";

const mounted = (el: Element, binding: DirectiveBinding) => {
  const {hasPermission} = usePermission();
  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', {mounted} as Directive)
}