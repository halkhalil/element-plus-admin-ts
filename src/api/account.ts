import axios from '~/utils/axios';

// 登录
const login = (params = {}) => {
  return axios.post('/login', params);
};

// 登出
const logout = () => {
  return axios.post('/logout');
};

// 个人信息
const info = () => {
  return axios.get('/personal/info');
};

// 权限节点
const fetchPermissions = () => {
  return axios.get('/personal/permissions');
};

// 菜单
const fetchMenus = () => {
  return axios.get('/personal/menus');
};

export {
  login,
  logout,
  info,
  fetchPermissions,
  fetchMenus,
};