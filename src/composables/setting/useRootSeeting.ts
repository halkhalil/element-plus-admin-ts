import {computed, unref} from 'vue'
import store from "~/store";
import {useMenuSetting} from "~/composables/setting/useMenuSeeting";
import {useWindowSize} from "@vueuse/core";
import {useTagViewSetting} from "~/composables/setting/useTagViewSeeting.js";
import {NavbarModeEnum, SizeEnum, ThemeEnum} from "~/enums/app";
import {PermissionModeEnum} from "~/enums/permission";
import {MenuModeEnum} from "~/enums/menu";
import {setting} from '~/settings/projectSetting'


export function useRootSetting() {

  const {dispatch, getters} = store;
  const getProjectConfig = computed(() => getters.getProjectConfig);
  const {getEnableTagView} = useTagViewSetting();
  const {setMenuSetting} = useMenuSetting();

  const getIsMobile = computed(() => {
    const {width} = useWindowSize();
    return width.value <= 992;
  });

  // 主题模式
  const getDarkMode = computed(() => unref(getProjectConfig).darkMode);

  // 导航模式
  const getIsMixMode = computed(() => getNavbarMode.value === 'mix');
  const getIsSidebarMode = computed(() => getNavbarMode.value === 'sidebar');
  const getIsTopMenuMode = computed(() => getNavbarMode.value === 'top-menu');

  // 内容显示
  const getShowLogo = computed(() => unref(getProjectConfig).showLogo);
  const getShowBreadcrumb = computed(() => unref(getProjectConfig).showBreadcrumb && !unref(getIsMobile) && !unref(getIsTopMenuMode));
  const getShowSettingDrawer = computed(() => unref(getProjectConfig).showSettingDrawer);
  const getShowHeaderLogo = computed(() => !unref(getIsSidebarMode) && unref(getShowLogo) && !unref(getIsMobile));
  const getShowSidebarLogo = computed(() => getIsSidebarMode.value && getShowLogo.value);
  const getShowTagView = computed(() => unref(getEnableTagView) && !unref(getIsMobile));
  const getShowHeaderTrigger = computed(() => !unref(getIsTopMenuMode));
  const getGlobalSize = computed(() => unref(getProjectConfig).size);

  // 动画
  const getNavbarMode = computed(() => unref(getProjectConfig).navbarMode);
  const getPageLoading = computed(() => getters.getPageLoading);
  const getOpenKeepAlive = computed(() => unref(getProjectConfig).openKeepAlive);

  // 权限模式
  const getPermissionMode = computed(() => unref(getProjectConfig).permissionMode);


  /**
   * 项目设置
   * @param rootSetting
   */
  async function setRootSetting(rootSetting) {
    await dispatch('app/setProjectConfig', rootSetting);
  }

  /**
   * toggle logo
   * @returns {Promise<void>}
   */
  async function toggleLogo() {
    await setRootSetting({showLogo: !unref(getShowLogo)});
  }

  /**
   * toggle breadcrumb
   * @returns {Promise<void>}
   */
  async function toggleBreadcrumb() {
    await setRootSetting({showBreadcrumb: !unref(getShowBreadcrumb)});
  }

  /**
   * open settingDrawer
   * @returns {Promise<void>}
   */
  async function openSettingDrawer() {
    await setRootSetting({showSettingDrawer: true});
  }

  /**
   * close settingDrawer
   * @returns {Promise<void>}
   */
  async function closedSettingDrawer() {
    await setRootSetting({showSettingDrawer: false});
  }

  /**
   * 切换导航栏模式
   * @param mode
   * @returns {Promise<void>}
   */
  async function toggleNavbarMode(mode: NavbarModeEnum) {
    let menuSetting = setting.menuSetting;
    if (mode === NavbarModeEnum.TOP_MENU) {
      menuSetting = {...menuSetting, mode: MenuModeEnum.HORIZONTAL, backgroundColor: 'white', textColor: 'black'}
    }
    await setRootSetting({navbarMode: mode});

    await setMenuSetting(menuSetting);
  }

  /**
   * 切换布局大小
   * @param size
   * @returns {Promise<void>}
   */
  async function toggleElementSize(size: SizeEnum) {
    await setRootSetting({size: size});
  }

  /**
   * 切换DarkMode
   * @param mode
   * @returns {Promise<void>}
   */
  async function toggleDarkMode(mode: ThemeEnum) {
    await setRootSetting({darkMode: mode});
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
    getShowTagView,
    getShowTab: getShowTagView,
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