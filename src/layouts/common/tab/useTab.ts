import path from "path";
import {RouteRecord, useRouter} from "vue-router";
import {computed, nextTick, onMounted, Ref, ref, unref, UnwrapRef, watch} from 'vue';
import {useStore} from "~/store";
import {TabView} from "~/store/modules/tab";

export function useTab() {

  const {tabStore} = useStore();
  const {push, replace, currentRoute, getRoutes} = useRouter();

  const scrollbarRef: UnwrapRef<any> = ref();
  const getTabRefs: Ref<UnwrapRef<any[]>> = ref([]);
  const getSelectTab = ref();
  const getVisitedTabs = computed(() => tabStore.getVisitedTabs);

  // 初始化
  onMounted(async () => {
    await initTabs();
    await addTab();
    await moveToCurrentTab();
  })

  // 初始化视图
  function initTabs() {
    const affixTabs = filterAffixTabs(getRoutes());
    for (const tab of affixTabs) {
      const {name, path, fullPath, meta} = tab as TabView;
      name && tabStore.addVisitedTab({name, path, fullPath, meta});
    }
  }

  /**
   * 跳转视图
   * @param tab
   * @returns {Promise<void>}
   */
  async function goTab(tab: TabView) {
    const {path, fullPath} = tab;
    if (path === unref(currentRoute).path) return;
    await replace({path: fullPath})
  }

  // 添加视图
  function addTab() {
    const {name, path, fullPath, meta} = currentRoute.value
    !meta?.hideTab && name && tabStore.addTab({name, path, fullPath, meta});

  }

  // 关闭视图
  async function closeTab({name, path, fullPath, meta}: TabView) {
    tabStore.delTab({name, path, fullPath, meta});
    if (tabIsActive({name, path, fullPath, meta} as TabView)) {
      await toLastTab(tabStore.visitedTabs, {name, path, fullPath, meta} as TabView);
    }
  }

  // 刷新视图
  async function refreshTab({name, path, fullPath, meta}: TabView) {
    tabStore.delCachedTab({name, path, fullPath, meta})
    await nextTick(() => {
      replace({path: '/redirect' + fullPath});
    })
  }

  // 关闭其他视图
  async function closeOtherTab({name, path, fullPath, meta}: TabView) {
    if (fullPath !== currentRoute.value.fullPath) {
      await push({name, path, fullPath, meta} as TabView);
    }
    tabStore.delOtherTabs(currentRoute)
    await moveToCurrentTab();
  }

  /**
   * 关闭所有视图
   * @param tab
   */
  async function closeAllTab(tab: TabView) {
    tabStore.delAllTabs();
    await toLastTab(tabStore.visitedTabs, tab);
  }

  /**
   * 过滤需要固定的视图
   * @param routes
   * @param basePath
   * @returns {[]}
   */
  function filterAffixTabs(routes: RouteRecord[], basePath = '/') {
    let tabs: object[] = [];
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tabPath = path.resolve(basePath, route.path)
        tabs.push({fullPath: tabPath, path: tabPath, name: route.name, meta: {...route.meta}})
      }
      if (route.children) {
        const childTabs = filterAffixTabs(route.children as RouteRecord[], route.path)
        if (childTabs.length >= 1) {
          tabs = [...tabs, ...childTabs]
        }
      }
    });
    return tabs
  }

  /**
   * 移动到当前路由所在标签
   * @returns {Promise<void>}
   */
  async function moveToCurrentTab() {
    await nextTick(async () => {
      for (const tag of getTabRefs.value) {
        if (tag.$attrs.route.path === unref(currentRoute).path) {
          moveToTarget(tag)
          if (tag.$attrs.route.fullPath !== unref(currentRoute).fullPath) {
            tabStore.updateVisitedTab(currentRoute.value)
          }
          break
        }
      }
    })
  }

  /**
   * 移动到指定标签位置
   * @param currentTag
   */
  function moveToTarget(currentTag: UnwrapRef<any>) {
    let offsetLeft = 0;
    const tagList = getTabRefs.value;

    if (tagList.length > 0) {
      const firstTag = tagList[0];
      const lastTag = tagList[tagList.length - 1];

      if (currentTag === firstTag) {
        offsetLeft = 0;
      } else if (currentTag === lastTag) {
        offsetLeft = lastTag.$el.offsetLeft;
      } else {
        const currentIndex = tagList.findIndex(item => item === currentTag);
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - 2;
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + 2

        const containerWidth = parseInt(scrollbarRef.value.$el.offsetWidth);
        const scrollWrapper = scrollbarRef.value.$refs.wrap$;

        if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
          offsetLeft = afterNextTagOffsetLeft - containerWidth;
        } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
          offsetLeft = beforePrevTagOffsetLeft
        }
      }
      scrollbarRef.value.setScrollLeft(offsetLeft);
    }
  }

  /**
   * 跳转到最后一个标签视图
   * @param visitedTabs
   * @param tab
   * @returns {Promise<void>}
   */
  async function toLastTab(visitedTabs: TabView[], {name, fullPath}: TabView) {
    const latestTab: TabView = visitedTabs.slice(-1)[0];
    if (latestTab) {
      await push({path: latestTab.fullPath})
    } else {
      if (name === 'Dashboard') {
        await replace({path: '/redirect' + fullPath})
      } else {
        await push('/')
      }
    }
  }

  /**
   * 是否活跃视图
   * @param tab
   * @returns {boolean}
   */
  function tabIsActive({path}: TabView) {
    return path === currentRoute.value.path;
  }

  /**
   * 是否固定视图
   * @param tab
   * @returns {boolean|*}
   */
  function tabIsAffix({meta}: TabView) {
    return meta && meta.affix;
  }

  watch(currentRoute, async () => {
    await addTab();
    await moveToCurrentTab()
  });

  return {
    scrollbarRef,
    getTabRefs,
    getSelectTab,
    getVisitedTabs,

    goTab,
    addTab,
    closeTab,
    refreshTab,
    closeOtherTab,
    closeAllTab,
    tabIsActive,
    tabIsAffix,
  };
}