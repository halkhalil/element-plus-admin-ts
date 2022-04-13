import {ref, onMounted, nextTick, unref, computed, Ref} from 'vue';
import {useDebounceFn} from '@vueuse/core';
import {StrictUseAxiosReturn} from "@vueuse/integrations/useAxios";

export interface UseFetchResourcesReturn {
  readonly formElRef: Ref<HTMLElement | null>,
  readonly confirmLoading: Ref<boolean>,
  readonly dialog: Ref<boolean>,
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
   * 删除项
   * @param item
   */
  deleteItem(item: object): void,

  /**
   * 确认操作
   */
  confirmItem(): void,

  /**
   * 取消操作
   */
  cancelItem(): void,

  /**
   * 搜索查询
   */
  getQuery(): void,
}

export function useFetchResources(
  useListReturn: StrictUseAxiosReturn<any>,
  useItemReturn: StrictUseAxiosReturn<any>,
  useUpdateReturn: StrictUseAxiosReturn<any>,
  useStoreReturn: StrictUseAxiosReturn<any>,
  useDeleteReturn: StrictUseAxiosReturn<any>,
  item
): UseFetchResourcesReturn {
  const formElRef = ref<HTMLElement | null>(null);
  const dialog = ref<boolean>(false);
  const isEdit = unref(item)?.id;
  const _item = JSON.parse(JSON.stringify(item));

  // 节流
  const _throttledQuery = useDebounceFn(async () => {
    await useListReturn.execute();
  }, 300);

  const getQuery = async () => {
    await _throttledQuery();
  }

  // 添加项
  const addItem = () => {
    _resetItem();
    dialog.value = true;
  }

  // 修改项
  const editItem = (item) => {
    item.value = item;
    dialog.value = true;
    useItemReturn.execute();
  }

  // 删除项
  const deleteItem = (item) => {
    item.value = item;
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
    _resetItem();
    dialog.value = false;
    nextTick(() => formElRef.value.clearValidate()).then(r => r);
  }

  // 重置
  const _resetItem = () => {
    item.value = _item;
  }

  const confirmLoading = computed(() => useUpdateReturn.loading.value || useStoreReturn.loading.value)

  return {
    formElRef,
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
    getQuery,
  };
}