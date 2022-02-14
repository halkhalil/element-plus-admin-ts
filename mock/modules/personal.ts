import {responseSuccess} from "../_utils.js";

const permissions1 = ["Role:update", "User:index", "User:store", "User:show", "User:update", "User:destroy", "Role:index", "Role:store", "Role:show", "Config:destroy", "Role:destroy", "Permission:index", "Permission:store", "Permission:autoGenerate", "Permission:show", "Permission:update", "Permission:destroy", "Config:update", "Config:show", "Config:groupUpdate", "Config:group", "Config:store", "Config:index", "Config:configItems"];
const menus1 = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'Layout',
    redirect: '/dashboard/workplace',
    meta: {title: '首页', icon: 'el-home', sort: 10},
    children: [
      {
        path: 'analysis',
        name: 'analysis',
        meta: {title: '分析页', affix: true},
        component: '/views/dashboard/analysis/index.vue',
      },
      {
        path: 'workplace',
        name: 'workplace',
        meta: {title: '工作台'},
        component: '/views/dashboard/workplace/index.vue',
      },
      {
        path: 'monitor',
        name: 'monitor',
        meta: {title: '监控页'},
        component: '/views/dashboard/monitor/index.vue',
      },
    ]
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system/configs',
    component: 'Layout',
    meta: {title: '系统', icon: 'el-windows', sort: 60},
    children: [
      {
        path: 'users',
        name: 'Users',
        meta: {title: '用户管理'},
        component: '/views/system/users/index.vue',
      },
      {
        path: 'roles',
        name: 'Roles',
        meta: {title: '角色管理'},
        component: '/views/system/roles/index.vue',
      },
      {
        path: 'menus',
        name: 'Menus',
        meta: {title: '菜单管理'},
        component: '/views/system/menus/index.vue',
      },
      {
        path: 'actions',
        name: 'Actions',
        meta: {title: '动作管理'},
        component: '/views/system/actions/index.vue',
      },
      {
        path: 'permissions',
        name: 'Permissions',
        meta: {title: '权限节点'},
        component: '/views/system/permissions/index.vue',
      },
      {
        path: 'configs',
        name: 'Config',
        meta: {title: '站点配置'},
        component: '/views/system/configs/index.vue',
      }
    ]
  },
];
const menus2 = menus1;
const permissions2 = {
  "menus": [{
    "id": 6,
    "pid": 5,
    "title": "用户管理",
    "icon": "el-icon-user-solid",
    "url": "/system/users",
    "type": "menu",
    "unique": "get,/system/users"
  }, {
    "id": 5,
    "pid": 0,
    "title": "系统",
    "icon": "el-windows",
    "url": "/system",
    "type": "menu",
    "unique": "get,/system"
  }
  ],
  "roles": ["Test"],
  "actions": ["User:index", "User:store"]
};

const userInfo1 = {
  "id": 1,
  "username": "shiwuhao",
  "nickname": "shiwuhao",
  "email": "admin@shiwuhao.com",
  "desc": "今天天气不错，挺风和日丽的",
  "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJt7bicBACKAWlkCacxl072UAfaOsxQgfbfpquHItiaPsDj4CoaC9Q02sI0DhSZdnKlQaUAb2E8Vicg/132",
  "gender": 0,
  "status": 1,
  "source": "1",
  "created_at": "2021-09-24 07:32:54",
  "status_label": "正常"
}

const userInfo2 = {
  "id": 2,
  "username": "test",
  "nickname": "test",
  "email": "test@shiwuhao.com",
  "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJt7bicBACKAWlkCacxl072UAfaOsxQgfbfpquHItiaPsDj4CoaC9Q02sI0DhSZdnKlQaUAb2E8Vicg/132",
  "gender": 0,
  "status": 1,
  "source": "1",
  "created_at": "2021-09-24 07:32:54",
  "status_label": "正常"
}

export default [
  {
    url: '/backend/personal/info',
    method: 'get',
    response: ({headers: {authorization}}) => {
      const userInfo = authorization === 'Bearer mockToken1' ? userInfo1 : userInfo2;
      return responseSuccess(userInfo)
    }
  },
  {
    url: '/backend/personal/permissions',
    method: 'get',
    response: ({headers: {authorization}}) => {
      const permissions = authorization === 'Bearer mockToken1' ? permissions1 : permissions2;
      return responseSuccess(permissions)
    }
  },
  {
    url: '/backend/personal/menus',
    method: 'get',
    response: ({headers: {authorization}}) => {
      const permissions = authorization === 'Bearer mockToken1' ? menus1 : menus2;
      return responseSuccess(permissions)
    }
  }
];