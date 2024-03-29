// 权限模式
export const enum PermissionModeEnum {
  BACK_MENU = 'backMenu',// 后端菜单模式
  FRONT_MENU = 'frontMenu',// 前端菜单模式
}

// 角色节点
export const enum RoleEnum {
  ADMINISTRATOR = 'Administrator',
  TEST = 'Test',
}

// 动作节点
export const enum ActionEnum {
  USER_LIST = 'user:index',
  USER_DETAIL = 'user:show',
  USER_ADD = 'user:store',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  ACTION_ADD = 'action:add',
}

// 权限节点 动作名称或角色名称
export const enum PermissionEnum {
  USER_LIST = 'user:list',
  USER_DETAIL = 'user:detail',
  USER_ADD = 'user:add',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
}