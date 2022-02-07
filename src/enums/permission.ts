// 权限模式
export const enum PermissionModeEnum {
  ROLE = 'role',
  ACTION = 'action',
}

// 角色节点
export const enum RoleEnum {
  ADMINISTRATOR = 'Administrator',
}

// 动作节点
export const enum ActionEnum {
  USER_LIST = 'user:index',
  USER_DETAIL = 'user:show',
  USER_ADD = 'user:store',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
}