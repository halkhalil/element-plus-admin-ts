//菜单展示模式
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

// 子菜单打开的触发方式，只在 mode 为 horizontal 时有效。
export enum MenuTrigger {
  HOVER = 'hover',
  CLICK = 'click',
}

// 菜单类型
export enum MenuTypeEnum {
  DIR = 'dir',
  MENU = 'menu',
  BUTTON = 'button',
}

// 菜单规则类型
export enum MenuRuleEnum {
  TAB = 'tab',
  LINK = 'link',
  IFRAME = 'iframe',
}
