import path from "path";
import {RouteLocationRaw, RouteRecord, useRouter} from "vue-router";
import {computed, nextTick, onMounted, Ref, ref, unref, UnwrapRef, watch} from 'vue';
import {useStore} from "~/store";
import {TabView} from "~/store/modules/tab";
import {ElScrollbar} from "element-plus";

export function useTab() {

  const {tabStore} = useStore();
  const {push, replace, currentRoute, getRoutes} = useRouter();

  const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
  const innerRef = ref<HTMLDivElement>();

  const getTabRefs: Ref<UnwrapRef<any[]>> = ref([]);
  const getSelectTab = ref();
  const getVisitedTabs = computed(() => tabStore.getVisitedTabs);

  onMounted(async () => {
    initTabs();
    addTab(currentRouteToView());

    await moveToCurrentTab();
  })

  watch(currentRoute, async () => {
    addTab(currentRouteToView());
    updateOrAddTab(currentRouteToView());
    await moveToCurrentTab()
  }, {deep: true});

  /**
   * 当前路由转tagView
   */
  function currentRouteToView() {
    const {name, meta, fullPath, path, query, params} = currentRoute.value;
    return {name, meta, fullPath, path, query, params} as unknown as TabView;
  }

  /**
   * 初始化视图
   */
  function initTabs() {
    const affixTabs = filterAffixTabs(getRoutes());
    for (const tab of affixTabs) {
      const {name, meta, fullPath, path, query, params} = tab as TabView;
      name && tabStore.addVisitedTab({name, meta, fullPath, path, query, params});
    }
  }

  /**
   * 跳转视图
   * @param view
   * @returns {Promise<void>}
   */
  async function goTab(view: TabView) {
    const {path, fullPath, query, params} = view;
    if (path === unref(currentRoute).path) return;
    await replace({path: fullPath, query, params} as RouteLocationRaw)
  }

  /**
   * 添加视图
   * @param view
   */
  function addTab(view: TabView) {
    !view?.meta?.hideTab && view?.name && tabStore.addTab(view);
  }

  /**
   * 更新视图
   * @param view
   */
  function updateTab(view: TabView) {
    tabStore.updateVisitedTab(view)
  }

  /**
   * 更新当前视图
   * @param view
   */
  function updateCurrentTab(view?: Partial<TabView>) {
    const currentView = currentRouteToView();
    updateTab({...currentView, ...view});
  }

  /**
   * 已存在更新，不存在添加
   * @param view
   */
  function updateOrAddTab(view: TabView) {
    tabStore.updateOrAddVisitedTab(view);
  }

  /**
   * 关闭视图
   * @param view
   */
  async function closeTab(view: TabView) {
    tabStore.delTab(view);
    if (tabIsActive(view)) {
      await toLastTab(tabStore.visitedTabs, view);
    }
  }

  /**
   * 刷新视图
   * @param view
   */
  async function refreshTab(view: TabView) {
    tabStore.delCachedTab(view)
    await nextTick(() => {
      replace({path: '/redirect' + view!.fullPath});
    })
  }

  /**
   * 关闭其他视图
   * @param view
   */
  async function closeOtherTab(view: TabView) {
    if (view!.fullPath !== currentRoute.value.fullPath) {
      await push(view as RouteLocationRaw);
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
        tabs.push({name: route.name, meta: {...route.meta}, fullPath: tabPath, path: tabPath, query: {}, params: {}})
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
    const currentView = currentRouteToView();
    await nextTick(() => {
      for (const tag of getTabRefs.value) {
        if (tag.$attrs.route.path === currentView.path) {
          moveToTarget(tag)

          if (tag.$attrs.route.fullPath !== currentView.fullPath) {
            tabStore.updateVisitedTab(currentView);
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

        const containerWidth = parseInt(scrollbarRef!.value!.$el.offsetWidth); //可视区域宽度
        const scrollWrapper = <HTMLDivElement>scrollbarRef!.value!.wrapRef;

        if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
          offsetLeft = afterNextTagOffsetLeft - containerWidth;
        } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
          offsetLeft = beforePrevTagOffsetLeft
        } else {
          if (currentTag.$el.offsetLeft >= containerWidth) {
            offsetLeft = currentTag.$el.offsetLeft;
          }
        }
      }
      scrollbarRef!.value!.setScrollLeft(offsetLeft);
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
      await push({path: latestTab.fullPath || ''})
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

  return {
    scrollbarRef,
    innerRef,
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
    updateTab,
    updateCurrentTab,
    currentRouteToView,
  };
}