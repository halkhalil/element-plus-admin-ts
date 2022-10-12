import {reactive, ref, toRefs, onMounted, nextTick, Ref, watch, unref, computed} from 'vue';
import {UrlParams, useDebounceFn, useUrlSearchParams} from '@vueuse/core';
import {AxiosInstance, AxiosPromise, AxiosRequestConfig} from "axios";
import {FormInstance} from "element-plus";
import {
  EasyUseAxiosReturn,
  StrictUseAxiosReturn,
  useAxios,
  UseAxiosOptions,
  UseAxiosReturn
} from "@vueuse/integrations/useAxios";

export interface UseApiResourceReturn {
  listsReturn: EasyUseAxiosReturn<any> & PromiseLike<EasyUseAxiosReturn<any>>,
  itemReturn: EasyUseAxiosReturn<any> & PromiseLike<EasyUseAxiosReturn<any>>,
  storeReturn: EasyUseAxiosReturn<any> & PromiseLike<EasyUseAxiosReturn<any>>,
  updateReturn: EasyUseAxiosReturn<any> & PromiseLike<EasyUseAxiosReturn<any>>,
  deleteReturn: EasyUseAxiosReturn<any> & PromiseLike<EasyUseAxiosReturn<any>>,
  getLists: any,
  getPaginate: any,
  dialog: any,

  fetchLists: any,
  fetchItem: any,
  fetchStore: any,
  fetchUpdate: any,
  fetchDelete: any,

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
  storeItem(item: object): void,

  /**
   * 删除
   * @param item
   */
  deleteItem(item: object): void,

  /**
   * 提交表单
   */
  submitForm(formEl?: FormInstance | undefined): Promise<void>,


  /**
   * 重置表单
   */
  resetForm(formEl?: FormInstance | undefined): void,

  /**
   * 取消
   */

  // cancelItem(formEl?: FormInstance): void,

  /**
   * 搜索查询
   */
  getQuery(): void,

  /**
   * 获取详情
   */
  getItem(item: object): void,

  /**
   * 获取列表
   */
  getList(): void,

  /**
   * 分页
   */
  changePage(page: number): void,
}


interface ApiResources {
  listsReturn: StrictUseAxiosReturn<any>,
  itemReturn: StrictUseAxiosReturn<any>,
  storeReturn: StrictUseAxiosReturn<any>,
  updateReturn: StrictUseAxiosReturn<any>,
  deleteReturn: StrictUseAxiosReturn<any>,
}

interface query {
  page?: string | number,
}

interface ApiResourceOptions {
  query?: query,
  form?: object,
  paginate?: object,
  uniqueId?: string,
  immediate?: boolean,// 自动加载列表api
  refreshAfterConfirm?: boolean,// 确认提交后刷新
}

export interface ApiResourcesConfig {
  lists(options?: any): AxiosRequestConfig,

  item(options?: any): AxiosRequestConfig,

  store(options?: any): AxiosRequestConfig,

  update(options?: any): AxiosRequestConfig,

  delete(options?: any): AxiosRequestConfig,
}

export interface ApiResourcesOptions extends UseAxiosOptions {
  params?: any,
  item?: any,
}

export function useApiResources(apiResources: ApiResourcesConfig, axios: AxiosInstance, options?: ApiResourcesOptions): UseApiResourceReturn {
  const params = reactive(options?.params || {});
  const immediate = options?.immediate ?? true;
  const item = ref<object>({});
  const isEdit = ref<boolean>(false);

  const listsReturn = useAxios(apiResources.lists({params}), axios);
  const itemReturn = useAxios(apiResources.item({}), axios);
  const storeReturn = useAxios(apiResources.store({}), axios);
  const updateReturn = useAxios(apiResources.update({}), axios);
  const deleteReturn = useAxios(apiResources.delete({}), axios);
  const submitReturn = computed(() => isEdit.value ? updateReturn : storeReturn);

  // 列表
  const getLists = computed(() => listsReturn.data.value?.data);
  const getPaginate = computed(() => {
    const {per_page, total, last_page} = listsReturn.data.value?.meta || {};
    return {pageSize: per_page, pageCount: last_page, total};
  })
  const getConfirmLoading = computed(() => updateReturn.loading || storeReturn.loading)

  const dialog = ref<boolean>(false);


  const fetchLists = async (options?: object) => {
    const config = apiResources.lists(options || {}) as AxiosRequestConfig;
    await listsReturn.execute(config.url as string, config);
  }

  const fetchItem = async (options?: object) => {
    const config = apiResources.item(options || {}) as AxiosRequestConfig;
    await itemReturn.execute(config.url as string, config);
    item.value = unref(itemReturn.data);
    console.log(item)
  }

  const fetchStore = async (options?: object) => {
    const config = apiResources.store(options || {}) as AxiosRequestConfig;
    await storeReturn.execute(config.url as string, config);
  }

  const fetchUpdate = async (options?: object) => {
    const config = apiResources.store(options || {}) as AxiosRequestConfig;
    await updateReturn.execute(config.url as string, config);
  }

  const fetchDelete = async (options?: object) => {
    const config = apiResources.delete(options || {}) as AxiosRequestConfig;
    await deleteReturn.execute(config.url as string, config);
  }

  // 添加项
  const addItem = () => {
    // resetItem();
    dialog.value = true;
  }

  // 修改项
  const editItem = async (options?: object) => {
    dialog.value = true;
    await fetchItem(options);
  }

  // 删除项
  const deleteItem = async (options?: object) => {
    await fetchDelete(options);
  }

  // 取消提交
  const cancelSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    dialog.value = false;
    formEl.resetFields()
  }

  // // 重置项
  // const resetItem = () => {
  //   state.form = JSON.parse(JSON.stringify(defaultForm));
  // }

  // 确认提交
  const submitForm = async (formEl: FormInstance | undefined, isEdit: boolean, options: object = {}): Promise<void> => {
    if (!formEl) return;
    const confirm = async () => {
      isEdit ? await fetchUpdate(options) : await fetchStore(options);
      // cancelItem(formEl);
    }

    await formEl.validate((valid) => {
      if (valid) {
        confirm()
      }
    })
  }

  // 重置表单
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  }

  // 分页
  const changePage = async (page) => {
    await fetchLists({params: {page: page}});
  }

  onMounted(async () => {
    immediate && await fetchLists();
  })

  watch(() => dialog, () => {
    if (!dialog.value) {
      // resetItem()
    }
  })

  return {
    listsReturn,
    itemReturn,
    storeReturn,
    updateReturn,
    deleteReturn,
    getLists,
    getPaginate,
    getConfirmLoading,
    dialog,

    fetchLists,
    fetchItem,
    fetchStore,
    fetchUpdate,
    fetchDelete,

    addItem,
    editItem,
    deleteItem, getItem(item: object): void {
    }, getList(): void {
    }, getQuery(): void {
    }, storeItem(item: object): void {
    }, updateItem(item: object): void {
    },
    // cancelItem,
    changePage,
    submitForm,
    resetForm
  };
}