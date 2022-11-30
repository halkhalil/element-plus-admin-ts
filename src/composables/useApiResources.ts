import {reactive, ref, onMounted, Ref, UnwrapRef} from 'vue';
import {useDebounceFn} from '@vueuse/core';
import {AxiosResponse} from "axios";
import {FormInstance} from "element-plus";
import {StrictUseAxiosReturn, UseAxiosOptions,} from "@vueuse/integrations/useAxios";
import {UnwrapNestedRefs} from "@vue/reactivity";

export interface Paginate {
  pageSizes?: number[],
  pageSize: number,
  pagerCount: number,
  total: number,
  layout?: string,
  currentPage: number | string,
}

export interface Loading {
  lists: boolean,
  submit: boolean,
  item: boolean,
  delete: boolean,
}

export interface UseApiResourcesReturn {
  editable: Ref<object | null>,
  dialog: Ref<boolean>,
  lists: Ref<object[]>,
  paginate: Ref<UnwrapRef<Paginate>>,
  loading: UnwrapNestedRefs<Loading>,
  params: UnwrapNestedRefs<Record<any, any>>,
  query: UnwrapNestedRefs<Record<any, any>>,
  isEdit: Ref<boolean>,

  fetchLists: (options?: any) => Promise<AxiosResponse>,
  fetchItem: (options?: any) => Promise<AxiosResponse | undefined>,
  fetchStore: (options?: any) => Promise<AxiosResponse | undefined>,
  fetchUpdate: (options?: any) => Promise<AxiosResponse | undefined>,
  fetchDelete: (options?: any) => Promise<AxiosResponse | undefined>,

  addItem: () => void,
  editItem: (options?: any) => void,
  deleteItem: (options?: any) => void,
  resetItem: (formEl?: FormInstance | undefined) => void,
  submitForm: (formEl: FormInstance | undefined, options: any, edit?: boolean) => void,
  resetForm: (formEl: FormInstance | undefined) => void,
  cancelForm: (formEl: FormInstance | undefined) => void,
  changePage: (page?: number) => void,
  handleQuery: () => void,
}


interface query {
  page?: string | number,
}

export interface ApiResourcesConfig {
  fetchLists: (options?: any) => Promise<AxiosResponse>,
  fetchStore?: (options?: any) => Promise<AxiosResponse>,
  fetchItem?: (options?: any) => Promise<AxiosResponse>,
  fetchUpdate?: (options?: any) => Promise<AxiosResponse>,
  fetchDelete?: (options?: any) => Promise<AxiosResponse>,
}

export interface ApiResourcesOptions extends UseAxiosOptions {
  params?: any,
  query?: query,
  form?: object,
  paginate?: object,
  uniqueId?: string,
  immediate?: boolean,// 自动加载列表api
  refreshListsAfterSubmit?: boolean,// 提交后刷新列表
}

export function useApiResources(apiResources: ApiResourcesConfig, options?: ApiResourcesOptions): UseApiResourcesReturn {

  const dialog = ref<boolean>(false);
  const editable = ref<object | null>(null);

  const params = reactive(options?.params || options?.query || {});
  const immediate = options?.immediate ?? true;
  const isEdit = ref(false);
  const refreshListsAfterSubmit = options?.refreshListsAfterSubmit || true;

  const lists = ref<object[]>([]);
  const paginate = ref<Paginate>({
    pageSizes: [10, 15, 30, 50],
    pageSize: 0,
    pagerCount: 0,
    currentPage: 1,
    total: 0,
    layout: 'pages, prev, pager, next, total',
  });
  const loading = reactive({
    lists: false,
    item: false,
    submit: false,
    delete: false,
  })

  const listsReturn = ref<AxiosResponse>();
  const storeReturn = ref<AxiosResponse | undefined>()
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
    const {data: {data, meta = {}}} = listsReturn.value;
    lists.value = data;
    if (meta) {
      const {per_page, total, last_page, current_page} = meta
      paginate.value.total = total;
      paginate.value.pageSize = per_page;
      paginate.value.pagerCount = last_page;
      paginate.value.currentPage = current_page;
    }
    loading.lists = false;
    return listsReturn.value;
  }

  const fetchStore = async (options?: any): Promise<AxiosResponse | undefined> => {
    if (_fetchStore) {
      loading.submit = true;
      storeReturn.value = await _fetchStore(options);
      loading.submit = false;
    }
    return storeReturn.value;
  }

  const fetchItem = async (options?: any): Promise<AxiosResponse | undefined> => {
    if (_fetchItem) {
      loading.item = true;
      itemReturn.value = await _fetchItem(options);
      loading.item = false;
    }
    return itemReturn.value;
  }

  const fetchUpdate = async (options?: any): Promise<AxiosResponse | undefined> => {
    if (_fetchUpdate) {
      loading.submit = true;
      updateReturn.value = await _fetchUpdate(options);
      loading.submit = false;
    }
    return updateReturn.value;
  }

  const fetchDelete = async (options?: any): Promise<AxiosResponse | undefined> => {
    if (_fetchDelete) {
      loading.delete = true;
      deleteReturn.value = await _fetchDelete(options);
      loading.delete = false;
    }
    return deleteReturn.value;
  }

  // 添加项
  const addItem = () => {
    editable.value = null;
    resetItem();
    dialog.value = true;
  }

  // 修改项
  const editItem = async (options?: any) => {
    dialog.value = true;
    isEdit.value = true;
    const {data: {data}} = await fetchItem(options) || {};
    editable.value = data;
  }

  // 删除项
  const deleteItem = async (options?: any) => {
    await fetchDelete(options);
    await fetchLists({params});
  }

  // 重置项
  const resetItem = (formEl?: FormInstance | undefined) => {
    editable.value = null;
    isEdit.value = false;
    if (formEl) {
      formEl.resetFields();
    }
  }

  // 提交表单
  const submitForm = async (formEl: FormInstance | undefined, options: any, edit?: boolean): Promise<void> => {
    if (!formEl) return;
    const confirm = async () => {
      isEdit.value || edit ? await fetchUpdate(options) : await fetchStore(options);
      refreshListsAfterSubmit && await fetchLists({params});
      cancelForm(formEl);
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
    resetItem();
  }

  // 取消提交
  const cancelForm = (formEl: FormInstance | undefined) => {
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
    editable,
    dialog,
    lists,
    paginate,
    loading,
    params,
    query: params,
    isEdit,

    fetchLists,
    fetchItem,
    fetchStore,
    fetchUpdate,
    fetchDelete,

    addItem,
    editItem,
    resetItem,
    deleteItem,
    submitForm,
    resetForm,
    cancelForm,
    changePage,
    handleQuery,
  };
}