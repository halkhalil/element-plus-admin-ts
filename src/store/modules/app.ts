import {defineStore} from 'pinia'
import {ThemeEnum} from "~/enums/app";
import {HeaderSetting, MenuSetting, ProjectSetting, TabSetting, TransitionSetting} from "#/config";
import {merge} from 'lodash-es'

interface AppState {
  darkMode?: ThemeEnum | null,
  pageLoading: boolean,
  projectConfig: ProjectSetting | null,
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: null,
    pageLoading: false,
    projectConfig: null,
  }),
  getters: {
    getProjectConfig(): ProjectSetting {
      return this.projectConfig || ({} as ProjectSetting);
    },
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): ThemeEnum {
      return this.darkMode as ThemeEnum;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getTabSetting(): TabSetting {
      return this.getProjectConfig.tabSetting;
    },
    getTheme(): ThemeEnum {
      return this.getProjectConfig.theme;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
    },
    setProjectConfig(config: Partial<ProjectSetting>): void {
      this.projectConfig = merge(this.projectConfig || {}, config) as ProjectSetting;
    },
    setTheme(theme: ThemeEnum) {
      document.documentElement.className = theme;
    },
    setLayout(layout){
      document.body.className = layout;
    }
  },
  persist: {
    enabled: true
  }
})