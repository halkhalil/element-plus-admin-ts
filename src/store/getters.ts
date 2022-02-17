const getters = {
  getConfigs: (state: any) => state.config.configs,
  getAccessToken: (state: any) => state.user.accessToken,
  getUser: (state: any) => state.user.user,
  getProjectConfig: (state: any) => state.app.projectConfig,
  getPageLoading: (state: any) => state.app.pageLoading,
  getMenuSetting: (state: any) => state.app.projectConfig.menuSetting,
  getHeaderSetting: (state: any) => state.app.projectConfig.headerSetting,
  getTransitionSetting: (state: any) => state.app.projectConfig.transitionSetting,
  getTagViewSetting: (state: any) => state.app.projectConfig.tagViewSetting,
  getDarkMode: (state: any) => state.app.projectConfig.darkMode,
  getCachedViews: (state: any) => state.tagView.cachedViews,
  getVisitedViews: (state: any) => state.tagView.visitedViews,
  getRoles: (state: any) => state.user.roles,
  getMenus: (state: any) => state.permission.menus,
  getPermissions: (state: any) => state.permission.permissions,
  getIsLoaded: (state: any) => state.permission.isLoaded,
};
export default getters
