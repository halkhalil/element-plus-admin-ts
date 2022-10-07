import {reactive, ref, toRefs, onMounted, nextTick, Ref, watch, unref, computed} from 'vue';
import {UrlParams, useDebounceFn, useUrlSearchParams} from '@vueuse/core';
import {AxiosPromise} from "axios";
import {FormInstance} from "element-plus";
import {StrictUseAxiosReturn, UseAxiosReturn} from "@vueuse/integrations/useAxios";

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

export function useApiResources(apiResources: ApiResources, options?: ApiResourceOptions): UseApiResourceReturn {

  const {listsReturn, itemReturn, storeReturn, updateReturn, deleteReturn} = apiResources;

  // 列表
  const {data: listsData, execute: fetchLists} = listsReturn;
  const getLists = computed(() => listsData.value?.data);
  const getPaginate = computed(() => {
    const {per_page, total, last_page} = listsData.value?.meta || {};
    return {pageSize: per_page, pageCount: last_page, total};
  })

  // 详情
  const {data: itemData, execute: fetchItem} = itemReturn;

  // 新增
  const {data: storeData, execute: fetchStore} = storeReturn;

  // 更新
  const {data: updateData, execute: fetchUpdate} = updateReturn;

  // 删除
  const {data: deleteData, execute: fetchDelete} = deleteReturn;

  const dialog = ref<boolean>(false);

  // 添加项
  const addItem = () => {
    resetItem();
    dialog.value = true;
  }

  // 修改项
  const editItem = async (item) => {
    dialog.value = true;
    await fetchItem();
  }

  // 确认提交
  const submitForm = async (formEl: FormInstance | undefined): Promise<void> => {
    if (!formEl) return;
    const confirm = async () => {
      state.form['id'] ? await fetchUpdate() : await fetchStore();
      cancelItem(formEl);
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
  const cancelItem = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    dialog.value = false;
    formEl.resetFields()
  }

  // 重置项
  const resetItem = () => {
    state.form = JSON.parse(JSON.stringify(defaultForm));
  }

  // 分页
  const changePage = async (page) => {
    await fetchLists({params:{page:page}});
  }

  onMounted(async () => {
   await fetchLists();
  })

  watch(() => dialog, () => {
    if (!dialog.value) {
      resetItem()
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
    addItem,
    editItem,
    cancelItem,
    changePage,
    submitForm,
    resetForm,
  };
}