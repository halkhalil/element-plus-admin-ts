<template>
  <div>
    <el-table ref="tableRef" v-bind="$attrs" v-loading="$attrs.loading">
      <template v-for="(column,index) in columns" :key="index">
        <el-table-column v-if="column.slot" v-bind="column">
          <template #default="scope">
            <slot :name="column.slot" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="column"/>
      </template>
      <slot></slot>
    </el-table>
    <div class="mt-2" v-if="paginate.total >0">
      <el-pagination v-bind="{background:true,small:true,...paginate}"
                     @current-change="changePage"
                     hide-on-single-page></el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  columns: {
    type: Array,
    default: () => ([]),
  },
  paginate: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['change-page'])
const changePage = (currentPage) => {
  emit('change-page', currentPage);
}

const tableRef = ref()

onMounted(()=>{
  console.log(tableRef)
})

</script>