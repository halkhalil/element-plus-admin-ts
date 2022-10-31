import {defineStore} from "pinia";
import {fetchConfigItems} from "~/api/config";

interface ConfigState {
  configs: {
    config_groups: object[],
  },
}

export const useConfigStore = defineStore({
  id: 'config',
  state: (): ConfigState => ({
    configs: {
      config_groups: [],
    },
  }),
  getters: {
    getConfigs: (state) => state.configs,
  },
  actions: {
    async setConfig() {
      const {data: {data}} = await fetchConfigItems();
      this.configs = data;
    }
  },
})