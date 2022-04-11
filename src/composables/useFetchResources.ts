import {reactive, ref, toRefs, onMounted, nextTick, Ref} from 'vue';
import {useDebounceFn} from '@vueuse/core';
import {AxiosPromise} from "axios";
import {StrictUseAxiosReturn, UseAxiosOptions} from "@vueuse/integrations/useAxios";

interface ResourceApi {
  useFetchList: () => AxiosPromise,
  useFetchItem: () => AxiosPromise,
  useFetchUpdate: () => AxiosPromise,
  useFetchStore: () => AxiosPromise,
  useFetchDelete: () => AxiosPromise,
  query: object,
  item: object,
  paginate: object,
  uniqueId: string,
  autoloadListApi: boolean,// 自动加载列表api
  refreshAfterConfirm: boolean,// 确认提交后刷新
}

export function useFetchResources(
  useFetchList: StrictUseAxiosReturn<any>,
  useFetchItem: StrictUseAxiosReturn<any>,
  useFetchUpdate: StrictUseAxiosReturn<any>,
  useFetchStore: StrictUseAxiosReturn<any>,
  useFetchDelete: StrictUseAxiosReturn<any>,
  options
) {
  const formElRef: ElRef = ref(HTMLElement);
  const queryElRef = ref(HTMLElement);
  const tableElRef = ref(HTMLElement);
  // const defaultItem = JSON.parse(JSON.stringify(item));

  const query = reactive({page: 1});
  const item = reactive({});
  const lists = reactive([]);
  const id = ref(null)

  const state = reactive({
    item: {},
    query: {},
    lists: [],
    dialog: false,
    paginate: {
      layout: 'prev, pager, next, ->, total',
      // ...paginate
    },
    listLoading: false,
    itemLoading: false,
    confirmLoading: false,
  });

  const {uniqueId = 'id'} = options;

  // 获取列表
  const {data: listResponse, loading: listLoading, execute: fetchList} = useFetchList;
  const {data: itemResponse, loading: itemLoading, execute: fetchItem} = useFetchItem;
  const {loading: storeLoading, isFinished: isStoreFinished, execute: fetchStore} = useFetchStore;
  const {loading: updateLoading, isFinished: isUpdateFinished, execute: fetchUpdate} = useFetchUpdate;
  const {loading: deleteLoading, execute: fetchDelete} = useFetchDelete;

  // 节流
  const _throttledQuery = useDebounceFn(async () => {
    await fetchList();
  }, 300);

  const getQuery = async () => {
    await _throttledQuery();
  }

  // 添加项
  const addItem = () => {
    // state.item = defaultItem;
    state.dialog = true;
  }

  // 修改项
  const editItem = (item) => {
    state.item = item;
    state.dialog = true;
    fetchItem();
  }

  // 删除项
  const deleteItem = (item) => {
    state.item = item;
    fetchDelete();
  }

  // 更新项
  const updateItem = () => {
    fetchUpdate()
    isUpdateFinished.value && fetchList();
  }

  // 保存项
  const storeItem = async () => {
    fetchStore();
    isStoreFinished.value && fetchList();
  }

  // 确认提交
  const confirmItem = () => {
    return new Promise(resolve => {
      formElRef.value.validate((valid) => {
        if (valid) {
          const {[uniqueId]: id} = state.item;
          id ? updateItem() : storeItem();
          cancelItem();
        }
      })
    })
  }

  // 取消提交
  const cancelItem = () => {
    state.item = defaultItem;
    state.dialog = false;
    nextTick(() => formElRef.value.clearValidate()).then(r => r);
  }

  onMounted( () => {
    fetchList()
  })

  return {
    ...toRefs(state),
    formElRef,
    queryElRef,
    tableElRef,
    fetchList,
    fetchItem,
    listResponse,
    addItem,
    editItem,
    updateItem,
    storeItem,
    deleteItem,
    confirmItem,
    cancelItem,
  };
}