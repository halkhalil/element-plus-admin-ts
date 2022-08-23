import {defineStore} from 'pinia'
import {ThemeEnum} from "~/enums/app";
import {ProjectSetting} from "#/config";
import store from "~/store";

interface AppState {
  darkMode?: ThemeEnum,
  pageLoading: boolean,
  projectConfig: ProjectSetting | null,
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: null,
  }),
  getters: {
    getProjectConfig: (state): ProjectSetting => {
      return state.projectConfig as ProjectSetting;
    },
    getPageLoading: (state): boolean => {
      return state.pageLoading as boolean;
    },
    getDarkMode: (state): ThemeEnum => {
      return state.darkMode as ThemeEnum;
    },
  },
  actions: {
    setPageLoading(loading: boolean) {
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum) {
      this.darkMode = mode;
    },
    setProjectConfig(config: ProjectSetting) {
      this.projectConfig = config;
    },
  },
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}