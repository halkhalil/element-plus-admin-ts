import {MenuModeEnum, MenuTrigger} from "~/enums/menu";
import {SizeEnum, LayoutEnum, TransitionEnum, ThemeEnum} from "~/enums/app";
import {PermissionModeEnum} from "~/enums/permission";

// menu
export interface MenuSetting {
  mode: MenuModeEnum,
  collapse: boolean,
  ellipsis: boolean,
  // backgroundColor: string,
  // textColor: string,
  // activeTextColor: string,
  defaultActive: string,
  defaultOpeneds: string[],
  uniqueOpened: boolean,
  menuTrigger: MenuTrigger,
  router: boolean,
  collapseTransition: boolean,
}

// header
export interface HeaderSetting {
  bgColor: string,
  fixed: boolean,
  show: boolean,
  theme: ThemeEnum,
  showFullScreen: boolean,
  useLockPage: boolean,
  showNotice: boolean,
  showSearch: boolean,
}

// 标签视图
export interface TabSetting {
  enable: boolean,
}

// 动画
export interface TransitionSetting {
  enable: boolean,
  basicTransition: TransitionEnum,
  openPageLoading: boolean,
  openNProgress: boolean,
}

// 项目设置
export interface ProjectSetting {
  menuSetting: MenuSetting,
  headerSetting: HeaderSetting,
  transitionSetting: TransitionSetting,
  tabSetting: TabSetting,
  theme: ThemeEnum,
  layout: LayoutEnum,
  showLogo: boolean,
  showBreadcrumb: boolean,
  showSettingDrawer: boolean,
  openKeepAlive: boolean,
  size: SizeEnum,
  permissionMode: PermissionModeEnum, // 权限模式
}