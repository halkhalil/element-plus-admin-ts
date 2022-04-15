import {ref, onMounted, nextTick, unref, computed, Ref, reactive} from 'vue';
import {useDebounceFn} from '@vueuse/core';
import {StrictUseAxiosReturn} from "@vueuse/integrations/useAxios";
import {UnwrapNestedRefs} from "@vue/reactivity";

export interface UseFetchResourcesReturn {
  readonly formElRef: Ref<HTMLElement | null>,
  readonly confirmLoading: Ref<boolean>,
  readonly dialog: Ref<boolean>,
  item: Ref<object>
  useListReturn: StrictUseAxiosReturn<any>,
  useItemReturn: StrictUseAxiosReturn<any>,
  useUpdateReturn: StrictUseAxiosReturn<any>,
  useStoreReturn: StrictUseAxiosReturn<any>,
  useDeleteReturn: StrictUseAxiosReturn<any>,

  /**
   * 添加项
   */
  addItem(): void,

  /**
   * 修改项
   * @param item
   */
  editItem(item: object): void,

  /**
   * 更新项
   * @param item
   */
  updateItem(item: object): void,

  /**
   * 新增项
   */
  storeItem(): void,

  /**
   * 删除
   * @param item
   */
  deleteItem(item: object): void,

  /**
   * 确认
   */
  confirmItem(): void,

  /**
   * 取消
   */
  cancelItem(): void,

  /**
   * 重置
   */
  resetItem():void,

  /**
   * 搜索查询
   */
  getQuery(): void,

  /**
   * 分页
   */
  changePage(page: number): void,
}

export function useFetchResources(
  useFetchList: (query: UnwrapNestedRefs<any>, options?: object) => StrictUseAxiosReturn<any>,
  useFetchItem: (item: UnwrapNestedRefs<any>, options?: object) => StrictUseAxiosReturn<any>,
  useFetchStore: (item: UnwrapNestedRefs<any>, options?: object) => StrictUseAxiosReturn<any>,
  useFetchUpdate: (item: UnwrapNestedRefs<any>, options?: object) => StrictUseAxiosReturn<any>,
  useFetchDelete: (item: UnwrapNestedRefs<any>, options?: object) => StrictUseAxiosReturn<any>,
  defaultItem?: object,
): UseFetchResourcesReturn {
  const item = ref(defaultItem || {});
  const formElRef = ref<HTMLElement | null>(null);
  const dialog = ref<boolean>(false);
  const isEdit = item['id'];
  const query = reactive({});

  const useListReturn = useFetchList(query, {immediate: true});
  const useItemReturn = useFetchItem(item, {immediate: false});
  const useUpdateReturn = useFetchStore(item, {immediate: false});
  const useStoreReturn = useFetchUpdate(item, {immediate: false});
  const useDeleteReturn = useFetchDelete(item, {immediate: false});

  // 节流
  const _throttledQuery = useDebounceFn(async () => {
    await useListReturn.execute();
  }, 300);

  const getQuery = async () => {
    await _throttledQuery();
  }

  // 添加项
  const addItem = () => {
    resetItem();
    dialog.value = true;
  }

  // 修改项
  const editItem = (_item) => {
    item.value = _item;
    console.log('editItem', item)
    dialog.value = true;
    useItemReturn.execute();
  }

  // 删除项
  const deleteItem = (_item) => {
    item.value = _item;
    useDeleteReturn.execute();
  }

  // 更新项
  const updateItem = () => {
    useUpdateReturn.execute()
    useUpdateReturn.isFinished.value && useListReturn.execute();
  }

  // 保存项
  const storeItem = async () => {
    useStoreReturn.execute();
    useStoreReturn.isFinished.value && useListReturn.execute();
  }

  // 确认提交
  const confirmItem = () => {
    return new Promise(resolve => {
      formElRef.value.validate((valid) => {
        if (valid) {
          isEdit ? updateItem() : storeItem();
          cancelItem();
        }
      })
    })
  }

  // 取消提交
  const cancelItem = () => {
    resetItem();
    dialog.value = false;
    nextTick(() => formElRef.value.clearValidate()).then(r => r);
  }

  // 重置
  const resetItem = () => {
    item.value = ref(defaultItem || {});
  }

  const changePage = (page: number) => {
    query.page = page;
    useListReturn.execute();
  }

  const confirmLoading = computed(() => useUpdateReturn.loading.value || useStoreReturn.loading.value)

  return {
    formElRef,
    item,
    dialog,
    confirmLoading,
    useListReturn,
    useItemReturn,
    useUpdateReturn,
    useStoreReturn,
    useDeleteReturn,
    addItem,
    editItem,
    updateItem,
    storeItem,
    deleteItem,
    confirmItem,
    cancelItem,
    resetItem,
    getQuery,
    changePage,
  };
}