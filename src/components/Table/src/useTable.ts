import {computed, ref} from "vue";
import {ElMessage, ElMessageBox} from 'element-plus'


interface TableOptions {
  selectionFiled?: string,
}

export function useTable(options?: TableOptions) {

  const {selectionFiled} = options || {};

  const tableRef = ref()
  const selections = ref([])
  const selectChange = (val: []) => {
    if (selectionFiled) {
      selections.value = val.map(item => item?.[selectionFiled])
    } else {
      selections.value = val;
    }
  }

  const selectionLength = computed(() => selections.value?.length);

  const batchDelete =() => {
    ElMessageBox.confirm('确认要批量删除选中项吗', 'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
  }

  return {
    tableRef,
    selections,
    selectionLength,
    selectChange,
    batchDelete,
  }
}