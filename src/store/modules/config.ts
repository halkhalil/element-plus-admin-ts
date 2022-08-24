import {defineStore} from "pinia";
import store from "~/store";

interface ConfigState {
  configs: object,
}

export const useConfigStore = defineStore({
  id: 'config',
  state: (): ConfigState => ({
    configs: {},
  }),
  getters: {
    getConfigs: (state) => state.configs,
  },
  actions: {}
})

export function useConfigStoreWithOut() {
  return useConfigStore(store)
}