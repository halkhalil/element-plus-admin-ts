const tab = {
  namespaced: true,
  state: {
    visitedTabs: [],
    cachedTabs: [],
  },
  mutations: {
    // 添加已访问视图
    ADD_VISITED_TAB: (state, view) => {
      if (state.visitedTabs.some(item => item.path === view.path)) return;
      state.visitedTabs.push({title: view.meta.title || 'no-name', ...view});
    },
    // 删除已访问视图
    DEL_VISITED_TAB: (state, view) => {
      const index = state.visitedTabs.findIndex(item => item.path === view.path);
      index > -1 && state.visitedTabs.splice(index, 1);
    },
    // 删除其他已访问视图
    DEL_OTHER_VISITED_TABS: (state, view) => {
      state.visitedTabs = state.visitedTabs.filter(item => item.meta.affix || item.path === view.path);
    },
    // 删除所有已访问视图
    DEL_ALL_VISITED_TABS: (state) => {
      state.visitedTabs = state.visitedTabs.filter(item => item.meta.affix);
    },
    // 更新已访问视图
    UPDATE_VISITED_TABS: (state, view) => {
      const index = state.visitedTabs.findIndex(item => item.path === view.path);
      index > -1 && (state.visitedTabs[index] = view);
    },
    // 添加缓存视图
    ADD_CACHED_TAB: (state, view) => {
      if (view.name && !state.cachedTabs.includes(view.name) && view.meta.cache !== false) {
        state.cachedTabs.push(view.name);
      }
    },
    // 删除缓存视图
    DEL_CACHED_TAB: (state, view) => {
      if (!view.name) return;
      const index = state.cachedTabs.findIndex(item => item === view.name);
      index > -1 && state.cachedTabs.splice(index, 1);
    },
    // 删除其他缓存视图
    DEL_OTHER_CACHED_TABS: (state, view) => {
      if (!view.name) return;
      state.cachedTabs = state.cachedTabs.filter(item => item === view.name);
    },
    // 删除其他缓存视图
    DEL_ALL_CACHED_TABS: (state) => {
      state.cachedTabs = [];
    }
  },
  actions: {
    // 添加已访问视图
    addVisitedTab({commit}, view) {
      commit('ADD_VISITED_TAB', view);
    },
    // 删除已访问视图
    delVisitedTab({commit, state}, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_TAB', view);
        resolve([...state.cachedTabs]);
      })
    },
    // 删除其他访问视图
    delOtherVisitedTabs({commit, state}, view) {
      return new Promise(resolve => {
        commit('DEL_OTHER_VISITED_TABS', view);
        resolve([...state.visitedTabs]);
      })
    },
    // 删除所有访问视图
    delAllVisitedTabs({commit, state}) {
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_TABS');
        resolve([...state.visitedTabs]);
      })
    },
    // 更新访问视图
    updateVisitedTab({commit}, view) {
      commit('UPDATE_VISITED_TABS', view);
    },
    // 添加缓存视图
    addCachedTab({commit}, view) {
      commit('ADD_CACHED_TAB', view);
    },
    // 删除缓存视图
    delCachedTab({commit, state}, view) {
      return new Promise(resolve => {
        commit('DEL_CACHED_TAB', view);
        resolve([...state.cachedTabs]);
      });
    },
    // 删除其他缓存视图
    delOtherCachedTabs({commit, state}, view) {
      return new Promise(resolve => {
        commit('DEL_OTHER_CACHED_TABS', view);
        resolve([...state.cachedTabs]);
      });
    },
    // 删除所有缓存视图
    delAllCachedTabs({commit, state}) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_TABS');
        resolve([...state.cachedTabs]);
      });
    },
    // 添加视图
    addTab({dispatch}, view) {
      dispatch('addVisitedTab', view);
      dispatch('addCachedTab', view);
    },
    // 删除视图
    delTab({dispatch, state}, view) {
      return new Promise(resolve => {
        dispatch('delVisitedTab', view);
        dispatch('delCachedTab', view);
        resolve({...state});
      });
    },
    // 删除其他视图
    delOtherTabs({dispatch, state}, view) {
      return new Promise(resolve => {
        dispatch('delOtherVisitedTabs', view);
        dispatch('delOtherCachedTabs', view);
        resolve({...state});
      });
    },
    // 删除所有视图
    delAllTabs({dispatch, state}) {
      return new Promise(resolve => {
        dispatch('delAllVisitedTabs');
        dispatch('delAllCachedTabs');
        resolve({...state});
      });
    }
  }
};
export default tab;
