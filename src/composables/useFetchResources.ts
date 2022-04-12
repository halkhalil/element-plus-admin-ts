import {ref, onMounted, nextTick, unref, computed} from 'vue';
import {useDebounceFn} from '@vueuse/core';
import {StrictUseAxiosReturn} from "@vueuse/integrations/useAxios";

export function useFetchResources(
  useListReturn: StrictUseAxiosReturn<any>,
  useItemReturn: StrictUseAxiosReturn<any>,
  useUpdateReturn: StrictUseAxiosReturn<any>,
  useStoreReturn: StrictUseAxiosReturn<any>,
  useDeleteReturn: StrictUseAxiosReturn<any>,
  item
) {
  const formElRef = ref(HTMLElement);
  const dialog = ref(false);
  const _item = JSON.parse(JSON.stringify(item));

  // const {uniqueId = 'id'} = options;
  const uniqueId = 'id'

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
          const {[uniqueId]: id} = unref(item);
          id ? updateItem() : storeItem();
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

  onMounted(() => {
    useListReturn.execute()
  })

  const confirmLoading = computed(() => useUpdateReturn.loading.value || useStoreReturn.loading.value)

  return {
    formElRef,
    dialog,

    //
    addItem,
    editItem,
    updateItem,
    storeItem,
    deleteItem,
    confirmItem,
    cancelItem,
    getQuery,

    confirmLoading,

    useListReturn,
    useItemReturn,
    useUpdateReturn,
    useStoreReturn,
    useDeleteReturn,
  };
}