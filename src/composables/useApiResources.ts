import {reactive, ref, toRefs, onMounted, nextTick, Ref, watch} from 'vue';
import {UrlParams, useDebounceFn, useUrlSearchParams} from '@vueuse/core';
import {AxiosPromise} from "axios";
import {FormInstance} from "element-plus";

export interface UseApiResourceReturn {
  readonly formElRef: Ref<HTMLElement | null>,
  readonly dialog: Ref<boolean>,
  form: Ref<object>,
  query: UrlParams,
  lists: Ref<object>,
  paginate: Ref<object>,
  loading: {
    list: boolean,
    item: boolean,
    confirm: boolean,
    delete: boolean,
  },

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
  cancelItem(formEl?: FormInstance): void,

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


interface ApiResource {
  fetchList: (query?: object) => AxiosPromise,
  fetchItem?: (item: any) => AxiosPromise,
  fetchStore: (data: any) => AxiosPromise,
  fetchUpdate: (data: any) => AxiosPromise,
  fetchDelete: (item: any) => AxiosPromise,
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

export function useApiResource(apiResource: ApiResource, options: ApiResourceOptions): UseApiResourceReturn {

  const {fetchList, fetchItem, fetchStore, fetchUpdate, fetchDelete} = apiResource;
  const {query: defaultQuery = {aa: 'aa'}, form: defaultForm = {}, immediate = true} = options;
  const query = useUrlSearchParams()

  const state = reactive({
    form: defaultForm,
    lists: [],
    dialog: false,
    paginate: {},
    refreshAfterConfirm: true,
  });

  const loading = reactive({
    list: false,
    item: false,
    confirm: false,
    delete: false,
  })

  // 节流
  const _throttledQuery = useDebounceFn(async () => {
    await getList();
  }, 300);

  const getQuery = async () => {
    await _throttledQuery();
  }

  // 获取列表
  const getList = async () => {
    loading.list = true;
    const {data: {data, meta: {per_page, total, last_page}}} = await fetchList(query).then(r => r);
    state.lists = data;
    state.paginate = {pageSize: per_page, pageCount: last_page, total}
    loading.list = false;
  }

  // 获取项
  const getItem = async (_item: object) => {
    if (fetchItem) {
      loading.item = true;
      const {data: {data}} = await fetchItem(_item).then(r => r);
      state.form = reactive(data);
      loading.item = false;
    }
  }

  // 添加项
  const addItem = () => {
    resetItem();
    state.dialog = true;
  }

  // 修改项
  const editItem = async (item) => {
    state.dialog = true;
    await getItem(item);
  }

  // 删除项
  const deleteItem = async (item) => {
    loading.delete = true;
    await fetchDelete(item).then(r => r);
    loading.delete = false;
    state.refreshAfterConfirm && await getList();
  }

  // 更新项
  const updateItem = async (item) => {
    loading.confirm = true;
    await fetchUpdate(item).then(r => r);
    loading.confirm = false;
    state.refreshAfterConfirm && await getList();
  }

  // 保存项
  const storeItem = async (item) => {
    loading.confirm = true;
    await fetchStore(item).then(r => r);
    loading.confirm = false;
    state.refreshAfterConfirm && await getList();
  }

  // 确认提交
  const submitForm = async (formEl: FormInstance | undefined): Promise<void> => {
    if (!formEl) return;
    const confirm = async () => {
      state.form['id'] ? await updateItem(state.form) : await storeItem(state.form);
      cancelItem(formEl);
    }

    await formEl.validate((valid) => {
      if (valid) {
        confirm()
      }
    })
  }

  // 取消提交
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  }

  // 取消提交
  const cancelItem = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    state.dialog = false;
    formEl.resetFields()
  }

  // 重置项
  const resetItem = () => {
    state.form = JSON.parse(JSON.stringify(defaultForm));
  }

  // 分页
  const changePage = async (page) => {
    query.page = page;
    await getList();
  }

  onMounted(async () => {
    immediate && await getList();
  })

  watch(() => state.dialog, () => {
    if (!state.dialog) {
      resetItem()
    }
  })

  return {
    ...toRefs(state),
    query,
    loading,
    getList,
    getQuery,
    getItem,
    addItem,
    editItem,
    updateItem,
    storeItem,
    deleteItem,
    cancelItem,
    changePage,

    submitForm,
    resetForm,
  };
}