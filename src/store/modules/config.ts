import {defineStore} from "pinia";
import store from "~/store";
import {configItemsApi} from "~/api/configs";

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
  actions: {
    async setConfig() {
      const {data: {data}} = await configItemsApi();
      this.configs = data;
    }
  },
})

export function useConfigStoreWithOut() {
  return useConfigStore(store)
}