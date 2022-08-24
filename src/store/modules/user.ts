import * as personal from '~/api/account';
import {RoleEnum} from "~/enums/permission";
import {defineStore} from "pinia";
import store from "~/store";

interface UserState {
  token: string | null,
  user: object | null,
  roles: RoleEnum[],
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: null,
    user: null,
    roles: [],
  }),
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getRoles: (state) => state.roles,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setRoles(roles: RoleEnum[]) {
      this.roles = roles;
    },
    setUser(user) {
      this.user = user;
    },
    async login(params) {
      const {data: {data}} = await personal.login(params);
      this.token = data.access_token;
      return data;
    },
    async fetchLogout() {
      await personal.logout();
      this.setToken(null);
      this.setUser(null);
    },
    async fetchUserInfo() {
      const {data: {data: {roles, ...user}}} = await personal.info();
      this.setUser(user)
      this.setRoles(roles.map(item => item.name))
      return user;
    },
  },
  persist: {
    enabled: true
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store);
}