import {ProjectSetting} from "~/../../types/config";
import {MenuModeEnum, MenuTrigger} from "~/enums/menu";
import {NavbarModeEnum, TransitionEnum, SizeEnum, ThemeEnum} from "~/enums/app";
import {PermissionModeEnum} from "~/enums/permission";

export const setting: ProjectSetting = {
  menuSetting: {
    mode: MenuModeEnum.VERTICAL,
    collapse: false,
    ellipsis: true,
    backgroundColor: '#222d32',
    textColor: '#fff',
    activeTextColor: '#409EFF',
    defaultActive: '',
    defaultOpeneds: [],
    uniqueOpened: true,
    menuTrigger: MenuTrigger.CLICK,
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
  tagViewSetting: {
    enable: true,
  },
  theme: ThemeEnum.LIGHT,
  navbarMode: NavbarModeEnum.SIDEBAR,
  showLogo: true,
  showBreadcrumb: true,
  showSettingDrawer: false,
  openKeepAlive: false,
  size: SizeEnum.DEFAULT,
  permissionMode:PermissionModeEnum.FRONT_MENU,
}

export default setting;