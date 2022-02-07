import {computed, shallowReactive} from 'vue'
import store from "~/store";
import {useRouter} from "vue-router";

export function useConfig() {
  const getConfigGroups = computed(() => store.getters.getConfigs['config_groups']);
  const getConfigTypes = computed(() => store.getters.getConfigs['config_types']);
  const getConfigComponents = computed(() => store.getters.getConfigs['config_components']);

  const getMenuTypes = computed(() => store.getters.getConfigs['menu_types']);
  const getPermissions = computed(() => store.getters.getConfigs['permissions']);


  const getRoles = computed(() => store.getters.getConfigs.roles);

  const getPermissionRoutes = shallowReactive(useRouter().getRoutes().filter(item => item.meta.menu));

  return {
    getConfigGroups,
    getConfigTypes,
    getConfigComponents,
    getMenuTypes,
    getPermissions,
    getRoles,
    getPermissionRoutes,
  }
}