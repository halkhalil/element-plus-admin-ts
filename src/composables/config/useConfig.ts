import {computed, shallowReactive} from 'vue'
import store from "~/store_bak";
import {useRouter} from "vue-router";

export function useConfig() {
  const getConfigGroups = computed(() => store.getters.getConfigs['config_groups']);
  const getConfigTypes = computed(() => store.getters.getConfigs['config_types']);
  const getConfigComponents = computed(() => store.getters.getConfigs['config_components']);

  const getMenuTypes = computed(() => store.getters.getConfigs['menu_types']);

  const getPermissionRoutes = shallowReactive(useRouter().getRoutes().filter(item => item.meta.menu));

  return {
    getConfigGroups,
    getConfigTypes,
    getConfigComponents,
    getMenuTypes,
    getPermissionRoutes,
  }
}