import {computed, shallowReactive} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "~/store";

export function useConfig() {

  const {configStore} = useStore();
  const getConfigGroups = computed(() => configStore.getConfigs['config_groups']);
  const getConfigTypes = computed(() => configStore.getConfigs['config_types']);
  const getConfigComponents = computed(() => configStore.getConfigs['config_components']);

  const getMenuTypes = computed(() => configStore.getConfigs['menu_types']);

  const getPermissionRoutes = shallowReactive(useRouter().getRoutes().filter(item => item.meta.menu));

  return {
    getConfigGroups,
    getConfigTypes,
    getConfigComponents,
    getMenuTypes,
    getPermissionRoutes,
  }
}