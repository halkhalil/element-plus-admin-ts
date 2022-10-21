import {defineStore} from "pinia";
import * as personal from '~/api/account';
import {RoleEnum} from "~/enums/permission";

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
    getToken(): string | null {
      return this.token;
    },
    getUser(): object | null {
      return this.user;
    },
    getRoles(): RoleEnum[] {
      return this.roles;
    },
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
    async fetchLogin(params) {
      const {data: {data}} = await personal.login(params);
      this.setToken(data.access_token);
    },
    async fetchLogout() {
      await personal.logout();
      this.setToken(null);
      this.setUser(null);
    },
    async fetchUserInfo() {
      const {data: {data: {roles = [], ...user}}} = await personal.info();
      this.setUser(user)
      this.setRoles(roles.map(item => item.name))
    },
  },
  persist: {
    enabled: true
  }
})