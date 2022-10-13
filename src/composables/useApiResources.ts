import {reactive, ref, toRefs, onMounted, nextTick, Ref, watch, unref, computed, UnwrapRef} from 'vue';
import {UrlParams, useDebounceFn, useUrlSearchParams} from '@vueuse/core';
import {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";
import {FormInstance} from "element-plus";
import {
  EasyUseAxiosReturn,
  StrictUseAxiosReturn,
  useAxios,
  UseAxiosOptions,
  UseAxiosReturn
} from "@vueuse/integrations/useAxios";
import {UnwrapNestedRefs} from "@vue/reactivity";

export interface Paginate {
  pageSize: number,
  pagerCount: number,
  total: number,
  layout?: string,
}

export interface Loading {
  lists: boolean,
  submit: boolean,
  item: boolean,
  delete: boolean,
}

export interface UseApiResourcesReturn {
  formRef: Ref<FormInstance | undefined>,
  formModel: Ref<object>,
  dialog: Ref<boolean>,
  lists: Ref<object[]>,
  paginate: Ref<UnwrapRef<Paginate>>,
  loading: UnwrapNestedRefs<Loading>,
  params: UnwrapNestedRefs<any>,
  isEdit: Ref<boolean>,

  fetchLists: (options?: any) => Promise<AxiosResponse>,
  fetchItem: (options?: any) => Promise<AxiosResponse>,
  fetchStore: (options?: any) => Promise<AxiosResponse>,
  fetchUpdate: (options?: any) => Promise<AxiosResponse>,
  fetchDelete: (options?: any) => Promise<AxiosResponse>,

  addItem: () => void,
  editItem: (options?: any) => void,
  deleteItem: (options?: any) => void,
  submitForm: (formEl: FormInstance | undefined, options: any) => void,
  resetForm: (formEl: FormInstance | undefined) => void,
  changePage: (page?: number) => void,
  handleQuery: () => void,
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
  fetchLists(options?: any): Promise<AxiosResponse>,

  fetchStore(options?: any): Promise<AxiosResponse>,

  fetchItem(options?: any): Promise<AxiosResponse>,

  fetchUpdate(options?: any): Promise<AxiosResponse>,

  fetchDelete(options?: any): Promise<AxiosResponse>,
}

export interface ApiResourcesOptions extends UseAxiosOptions {
  params?: any,
  formModel?: any,
}

export function useApiResources(apiResources: ApiResourcesConfig, options?: ApiResourcesOptions): UseApiResourcesReturn {

  const dialog = ref<boolean>(false);
  const isEdit = ref<boolean>(false);

  const formRef = ref<FormInstance>()

  const params = reactive(options?.params || {});
  const formModel = ref(options?.formModel || {});
  const immediate = options?.immediate ?? true;

  const lists = ref<object[]>([]);
  const paginate = ref<Paginate>({
    pageSize: 0,
    pagerCount: 0,
    total: 0,
    layout: 'prev, pager, next, jumper, ->, total',
  });
  const loading = reactive({
    lists: false,
    item: false,
    submit: false,
    delete: false,
  })

  const listsReturn = ref<AxiosResponse>();
  const storeReturn = ref<AxiosResponse>()
  const itemReturn = ref<AxiosResponse>()
  const updateReturn = ref<AxiosResponse>()
  const deleteReturn = ref<AxiosResponse>()

  const {
    fetchLists: _fetchLists,
    fetchStore: _fetchStore,
    fetchItem: _fetchItem,
    fetchUpdate: _fetchUpdate,
    fetchDelete: _fetchDelete
  } = apiResources;

  const fetchLists = async (options?: any): Promise<AxiosResponse> => {
    loading.lists = true;
    listsReturn.value = await _fetchLists(options);
    console.log(listsReturn.value)
    const {data: {data, meta = {}}} = listsReturn.value;
    lists.value = data;
    if (meta) {
      const {per_page, total, last_page} = meta
      paginate.value.total = total;
      paginate.value.pageSize = per_page;
      paginate.value.pagerCount = last_page;
    }
    loading.lists = false;
    return listsReturn.value;
  }

  const fetchStore = async (options?: any): Promise<AxiosResponse> => {
    loading.submit = true;
    storeReturn.value = await _fetchStore(options);
    loading.submit = false;
    return storeReturn.value;
  }

  const fetchItem = async (options?: any): Promise<AxiosResponse> => {
    loading.item = true;
    itemReturn.value = await _fetchItem(options);
    loading.item = false;
    return itemReturn.value;
  }

  const fetchUpdate = async (options?: any): Promise<AxiosResponse> => {
    loading.submit = true;
    updateReturn.value = await _fetchUpdate(options);
    loading.submit = false;
    return updateReturn.value;
  }

  const fetchDelete = async (options?: any): Promise<AxiosResponse> => {
    loading.delete = true;
    deleteReturn.value = await _fetchDelete(options);
    loading.delete = false;
    return deleteReturn.value;
  }

  // 添加项
  const addItem = () => {
    resetItem();
    dialog.value = true;
  }

  // 修改项
  const editItem = async (options?: any) => {
    isEdit.value = true;
    dialog.value = true;
    const {data: {data}} = await fetchItem(options);
    formModel.value = data;
  }

  // 删除项
  const deleteItem = async (options?: any) => {
    await fetchDelete(options);
  }

  // 重置项
  const resetItem = () => {
    formModel.value = options?.formModel || {}
    isEdit.value = false;
    formRef.value?.resetFields();
  }

  // 提交表单
  const submitForm = async (formEl: FormInstance | undefined, options: any): Promise<void> => {
    if (!formEl) return;
    const confirm = async () => {
      isEdit.value ? await fetchUpdate(options) : await fetchStore(options);
      cancelSubmit(formEl);
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

  // 取消提交
  const cancelSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    dialog.value = false;
    formEl.resetFields()
    resetItem();
  }

  // 节流
  const _throttledQuery = useDebounceFn(async () => {
    await fetchLists({params});
  }, 300);

  const handleQuery = async () => {
    await _throttledQuery();
  }

  // 处理分页
  const changePage = async (page) => {
    params.page = page;
    await fetchLists({params});
  }

  onMounted(async () => {
    immediate && await fetchLists({params});
  })

  return {
    formRef,
    formModel,
    dialog,
    lists,
    paginate,
    loading,
    params,
    isEdit,

    fetchLists,
    fetchItem,
    fetchStore,
    fetchUpdate,
    fetchDelete,

    addItem,
    editItem,
    deleteItem,
    submitForm,
    resetForm,
    changePage,
    handleQuery,
  };
}