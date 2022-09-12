import {ProjectSetting} from "~/../../types/config";
import {MenuModeEnum, MenuTrigger} from "~/enums/menu";
import {LayoutEnum, TransitionEnum, SizeEnum, ThemeEnum} from "~/enums/app";
import {PermissionModeEnum} from "~/enums/permission";

export const setting: ProjectSetting = {
  menuSetting: {
    mode: MenuModeEnum.VERTICAL,
    collapse: false,
    ellipsis: true,
    defaultActive: '',
    defaultOpeneds: [],
    uniqueOpened: true,
    menuTrigger: MenuTrigger.HOVER,
    router: true,
    collapseTransition: true,
  },
  headerSetting: {
    bgColor: 'white',
    fixed: false,
    show: true,
    theme: ThemeEnum.LIGHT,
    showFullScreen: true,
    useLockPage: false,
    showNotice: true,
    showSearch: false,
  },
  transitionSetting: {
    enable: true,
    basicTransition: TransitionEnum.FADE,
    openPageLoading: true,
    openNProgress: true,
  },
  tabSetting: {
    enable: true,
  },
  theme: ThemeEnum.DEFAULT,
  layout: LayoutEnum.VERTICAL,
  showLogo: true,
  showBreadcrumb: true,
  showSettingDrawer: false,
  openKeepAlive: false,
  size: SizeEnum.DEFAULT,
  permissionMode:PermissionModeEnum.FRONT_MENU,
}

export default setting;