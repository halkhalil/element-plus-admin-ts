import {computed} from 'vue'
import {useMenuSetting} from "~/composables/setting/useMenuSeeting";
import {useWindowSize} from "@vueuse/core";
import {NavbarModeEnum, SizeEnum, ThemeEnum} from "~/enums/app";
import {PermissionModeEnum} from "~/enums/permission";
import {MenuModeEnum} from "~/enums/menu";
import {setting} from '~/settings/projectSetting'
import {MenuSetting, ProjectSetting} from "#/config";
import {useStore} from "~/store";


export function useRootSetting() {

  const {appStore} = useStore();
  const {setMenuSetting} = useMenuSetting();

  const getIsMobile = computed(() => {
    const {width} = useWindowSize();
    return width.value <= 992;
  });

  // 主题模式
  const getDarkMode = computed(() => appStore.darkMode);

  // 导航模式
  const getIsMixMode = computed(() => appStore.getProjectConfig.navbarMode === NavbarModeEnum.TOP_MIX);
  const getIsSidebarMode = computed(() => appStore.getProjectConfig.navbarMode === NavbarModeEnum.SIDEBAR);
  const getIsTopMenuMode = computed(() => appStore.getProjectConfig.navbarMode === NavbarModeEnum.TOP_MENU);

  // 内容显示
  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo);
  const getShowBreadcrumb = computed(() => appStore.getProjectConfig.showBreadcrumb && !getIsMobile.value && !getIsTopMenuMode.value);
  const getShowSettingDrawer = computed(() => appStore.getProjectConfig.showSettingDrawer);
  const getShowHeaderLogo = computed(() => !getIsSidebarMode.value && getShowLogo.value && !getIsMobile.value);
  const getShowSidebarLogo = computed(() => getIsSidebarMode.value && getShowLogo.value);
  const getShowTab = computed(() => appStore.getTabSetting.enable && !getIsMobile.value);
  const getShowHeaderTrigger = computed(() => !getIsTopMenuMode.value);
  const getGlobalSize = computed(() => appStore.getProjectConfig.size);

  // 动画
  const getNavbarMode = computed(() => appStore.getProjectConfig.navbarMode);
  const getPageLoading = computed(() => appStore.getPageLoading);
  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive);

  // 权限模式
  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode);

  /**
   * 项目设置
   * @param setting
   */
  function setRootSetting(setting: Partial<ProjectSetting>) {
    appStore.setProjectConfig(setting)
  }

  // toggle logo
  function toggleLogo() {
    setRootSetting({showLogo: !getShowLogo.value});
  }

  // toggle breadcrumb
  function toggleBreadcrumb() {
    setRootSetting({showBreadcrumb: !getShowBreadcrumb.value});
  }

  // open settingDrawer
  function openSettingDrawer() {
    setRootSetting({showSettingDrawer: true});
  }

  // close settingDrawer
  function closedSettingDrawer() {
    setRootSetting({showSettingDrawer: false});
  }

  /**
   * 切换导航栏模式
   * @param mode
   */
  function toggleNavbarMode(mode: NavbarModeEnum) {
    let menuSetting: Partial<MenuSetting> = setting.menuSetting;
    if (mode === NavbarModeEnum.TOP_MENU) {
      menuSetting = {...menuSetting, mode: MenuModeEnum.HORIZONTAL}
    }
    setRootSetting({navbarMode: mode});
    setMenuSetting(menuSetting);
  }

  /**
   * 切换布局大小
   * @param size
   */
  function toggleElementSize(size: SizeEnum) {
    setRootSetting({size: size});
  }

  /**
   * 切换主题
   * @param mode
   */
  function toggleDarkMode(mode: ThemeEnum) {
    setRootSetting({theme: mode});
  }

  /**
   * 切换权限模式
   */
  const togglePermissionMode = async () => {
    const {setRootSetting} = useRootSetting();
    const mode = getPermissionMode.value == PermissionModeEnum.BACK_MENU ? PermissionModeEnum.FRONT_MENU : PermissionModeEnum.BACK_MENU
    await setRootSetting({permissionMode: mode});
    location.reload();
  }

  return {
    setRootSetting,
    toggleLogo,
    toggleBreadcrumb,
    toggleNavbarMode,
    toggleDarkMode,
    openSettingDrawer,
    closedSettingDrawer,
    toggleElementSize,
    togglePermissionMode,

    getDarkMode,
    getNavbarMode,
    getShowLogo,
    getShowBreadcrumb,
    getShowSettingDrawer,
    getShowHeaderLogo,
    getShowSidebarLogo,
    getShowTab,
    getShowHeaderTrigger,
    getIsSidebarMode,
    getIsMixMode,
    getIsTopMenuMode,
    getIsMobile,
    getPageLoading,
    getOpenKeepAlive,
    getGlobalSize,
    getPermissionMode,
  };
}