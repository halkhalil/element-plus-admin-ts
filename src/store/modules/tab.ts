import {defineStore} from "pinia";
import {RouteMeta} from "~/router/types";

export interface TabView {
  name: string | undefined,
  path: string | undefined,
  fullPath: string | undefined,
  meta: RouteMeta,
  params: object | null,
  query: object | null,
}

interface TabState {
  visitedTabs: TabView[],
  cachedTabs: TabView[],
}

export const useTabStore = defineStore({
  id: 'tab',
  state: (): TabState => ({
    visitedTabs: [],
    cachedTabs: [],
  }),
  getters: {
    getCachedTabs: (state) => state.cachedTabs,
    getVisitedTabs: (state) => state.visitedTabs,
  },
  actions: {
    // 添加已访问视图
    addVisitedTab(view) {
      if (this.visitedTabs.some(item => item.path === view.path)) return;
      this.visitedTabs.push(view);
    },
    // 删除已访问视图
    delVisitedTab(view) {
      const index = this.visitedTabs.findIndex(item => item.path === view.path);
      index > -1 && this.visitedTabs.splice(index, 1);
    },
    // 删除其他访问视图
    delOtherVisitedTabs(view) {
      this.visitedTabs = this.visitedTabs.filter(item => item.meta.affix || item.path === view.path);
    },
    // 删除所有访问视图
    delAllVisitedTabs() {
      this.visitedTabs = this.visitedTabs.filter(item => item.meta.affix);
    },
    // 更新访问视图
    updateVisitedTab(view: TabView) {
      const index = this.visitedTabs.findIndex(item => item.path === view.path);
      index > -1 && (this.visitedTabs[index] = view);
    },
    updateOrAddVisitedTab(view) {
      const index = this.visitedTabs.findIndex(item => item === view);
      index > -1 ? this.updateVisitedTab(view) : this.addVisitedTab(view);
    },
    // 添加缓存视图
    addCachedTab(view) {
      if (view.name && !this.cachedTabs.includes(view.name) && view.meta.keepalive === true) {
        this.cachedTabs.push(view.name);
      }
    },
    // 删除缓存视图
    delCachedTab(view) {
      if (!view.name) return;
      const index = this.cachedTabs.findIndex(item => item === view.name);
      index > -1 && this.cachedTabs.splice(index, 1);
    },
    // 删除其他缓存视图
    delOtherCachedTabs(view) {
      if (!view.name) return;
      this.cachedTabs = this.cachedTabs.filter(item => item === view.name);
    },
    // 删除所有缓存视图
    delAllCachedTabs() {
      this.cachedTabs = [];
    },
    // 添加视图
    addTab(view) {
      this.addVisitedTab(view);
      this.addCachedTab(view);
    },
    // 删除视图
    delTab(view) {
      this.delVisitedTab(view);
      this.delCachedTab(view);
    },
    // 删除其他视图
    delOtherTabs(view) {
      this.delOtherVisitedTabs(view);
      this.delOtherCachedTabs(view);
    },
    // 删除所有视图
    delAllTabs() {
      this.delAllVisitedTabs();
      this.delAllCachedTabs();
    }
  },
  persist: {
    enabled: true,
  }
})