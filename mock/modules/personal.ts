import {responseSuccess} from "../_utils.js";

const permissions1 = ["user:list", "user:add", "user:update", "user:delete"];
const menus1 = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'Layout',
    redirect: '/dashboard/workplace',
    meta: {title: '首页', icon: 'ep:home', sort: 10},
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
    path: '/permission',
    name: 'Permission',
    redirect: '/permission/page',
    component: 'Layout',
    meta: {title: '权限', icon: 'ep:lock', sort: 50},
    children: [
      {
        path: 'front',
        name: 'permissionPage2',
        meta: {title: '基于前端权限'},
        component: '/views/demo/permission/frontPermission.vue',
      },
      {
        path: 'back',
        name: 'BackPermission',
        meta: {title: '基于后端权限'},
        component: '/views/demo/permission/backPermission.vue',
      },
    ]
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system/configs',
    component: 'Layout',
    meta: {title: '系统', icon: 'ep:windows', sort: 60},
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
const menus2 = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'Layout',
    redirect: '/dashboard/workplace',
    meta: {title: '首页', icon: 'ep:home', sort: 10},
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
    path: '/permission',
    name: 'Permission',
    redirect: '/permission/page',
    component: 'Layout',
    meta: {title: '权限', icon: 'ep:lock', sort: 50},
    children: [
      {
        path: 'front',
        name: 'permissionPage2',
        meta: {title: '基于前端权限'},
        component: '/views/demo/permission/frontPermission.vue',
      },
      {
        path: 'back',
        name: 'BackPermission',
        meta: {title: '基于后端权限'},
        component: '/views/demo/permission/backPermission.vue',
      },
    ]
  }
];
const permissions2 = ["user:list"];

const userInfo1 = {
  "id": 1,
  "username": "Admin",
  "nickname": "Admin",
  "email": "admin@shiwuhao.com",
  "desc": "今天天气不错，挺风和日丽的",
  "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJt7bicBACKAWlkCacxl072UAfaOsxQgfbfpquHItiaPsDj4CoaC9Q02sI0DhSZdnKlQaUAb2E8Vicg/132",
  "gender": 0,
  "status": 1,
  "source": "1",
  "created_at": "2021-09-24 07:32:54",
  "status_label": "正常",
  "roles": [{name: 'Administrator', label: '超级管理员'}],
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
  "status_label": "正常",
  "roles": [{name: 'Test', label: '测试'}],
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