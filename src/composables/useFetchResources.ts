import {ref, onMounted, nextTick, unref, computed, Ref, reactive, toRefs} from 'vue';
import {useDebounceFn, useUrlSearchParams} from '@vueuse/core';
import {EasyUseAxiosReturn, StrictUseAxiosReturn} from "@vueuse/integrations/useAxios";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {useAxios} from "@vueuse/integrations/useAxios";
import axios from "~/utils/axios";
import {callbackFn} from "#/index";
import {FormInstance} from "element-plus";

export interface UseFetchResourcesReturn {
  readonly formElRef: Ref<HTMLElement | null>,
  readonly dialog: Ref<boolean>,
  item: Ref<object>
  loading: {
    list: boolean,
    item: boolean,
    confirm: boolean,
  },
  useListReturn: EasyUseAxiosReturn<any>,
  useItemReturn: EasyUseAxiosReturn<any>,
  useUpdateReturn: EasyUseAxiosReturn<any>,
  useStoreReturn: EasyUseAxiosReturn<any>,
  useDeleteReturn: EasyUseAxiosReturn<any>,

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
  confirmItem(item: object, formEl?: FormInstance): void,

  /**
   * 取消
   */
  cancelItem(clearValidate?: callbackFn): void,

  /**
   * 重置
   */
  resetForm(): void,

  /**
   * 搜索查询
   */
  getQuery(): void,

  /**
   * 分页
   */
  changePage(page: number): void,
}

export interface UseFetchResourceOptions {
  item?: object | undefined,
  query?: object | undefined,
  immediate?: boolean | undefined,
}

export function useFetchResources(
  resourceUrl: string,
  options?: UseFetchResourceOptions,
): UseFetchResourcesReturn {

  const formElRef = ref<HTMLElement | null>(null);

  const {item: defaultItem = {}, query: defaultQuery = {}, immediate = true} = options || {};
  const query = useUrlSearchParams('history', {initialValue: defaultQuery})
  let item = reactive(defaultItem);
  const isEdit = item['id'];
  const dialog = ref(false)

  const useListReturn = useAxios({method: 'get'}, axios);
  const useItemReturn = useAxios({method: 'get'}, axios);
  const useUpdateReturn = useAxios({method: 'put', data: item}, axios);
  const useStoreReturn = useAxios({method: 'post', data: item}, axios);
  const useDeleteReturn = useAxios({method: 'delete', data: item}, axios);

  const itemUrl = computed(() => [resourceUrl, unref(item)?.id].join('/'));

  // 筛选
  const getQuery = async () => {
    await useDebounceFn(async () => {
      await useListReturn.execute(resourceUrl);
    }, 300);
  }

  // 添加项
  const addItem = () => {
    resetItem();
    dialog.value = true;
  }

  // 修改项
  const editItem = (_item) => {
    item = reactive(_item);
    dialog.value = true;
    useItemReturn.execute(unref(itemUrl));
  }

  // 删除项
  const deleteItem = (_item) => {
    item = reactive(_item);
    useDeleteReturn.execute(unref(itemUrl));
  }

  // 更新项
  const updateItem = () => {
    useUpdateReturn.execute(unref(itemUrl))
    useUpdateReturn.isFinished.value && useListReturn.execute(unref(itemUrl));
  }

  // 保存项
  const storeItem = async () => {
    useStoreReturn.execute(resourceUrl);
    useStoreReturn.isFinished.value && useListReturn.execute(resourceUrl);
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
    item = reactive(defaultItem || {});
  }

  const changePage = (page: number) => {
    query.page = page;
    useListReturn.execute(resourceUrl);
  }

  const confirmLoading = computed(() => useUpdateReturn.loading.value || useStoreReturn.loading.value)

  return {

    formElRef,
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