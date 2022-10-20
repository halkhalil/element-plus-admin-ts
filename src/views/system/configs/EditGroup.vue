<template>
  <BasicForm
    v-model="form"
    label-position="top"
    :action-props="{position:'left',submitButtonProps:{loading:confirmLoading}}"
    :schemas="schemas"
    @submit="updateItem">
    <template #label="{labelProps}">
      <span class="label">{{ labelProps.title }}</span>
      <span class="sub-label">{{ labelProps.name }}</span>
    </template>
  </BasicForm>
</template>

<script lang="ts" setup>
import {BasicForm} from "~/components/Form/index.ts";
import {groupListApi, groupUpdateApi} from "~/api/configs.ts"
import {useApiResources} from "~/composables/useApiResources";
import {ref, watch} from "vue";

defineProps({
  group:String,
})

const {listLoading, confirmLoading, query, formRef, item: form, lists, updateItem, getList} = useApiResources({
  listApi: groupListApi,
  updateApi: groupUpdateApi,
  query: {group: props.group},
})

const object2array = (object) => {
  return Object.keys(object).map(item => {
    return {value: item, label: object[item]};
  });
}

const schemas = ref([]);
watch(lists, () => {
  form.value = {};
  lists.value.forEach(item => {
    let componentProps = {style: {width: '100%'},};
    switch (item.component) {
      case 'Select':
        componentProps = {options: object2array(item['parse_extra'])};
        break;
      case 'Upload':
        componentProps = {fileList: [{url: item['parse_value'], name: item['parse_value']}], limit: 1};
        break;
      default:
    }

    form.value[item.name] = item.value;
    schemas.value.push({
      field: item.name,
      labelProps: {title: item.title, name: item.name},
      component: item.component,
      formProps: {
        required: true,
      },
      componentProps: {style: {width: '100%'}, ...componentProps}
    })
  })
})

</script>

<style scoped>
.label {

}

.sub-label {
  color: #C0C4CC;
  margin-left: 10px;
}
</style>