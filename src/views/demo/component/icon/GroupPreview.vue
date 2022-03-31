<template>
  <el-card shadow="none">
    <el-row justify="center">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-input v-model="query" @input="handleSearch" placeholder="输入图标名称进行搜索">
          <template #prepend>
            <el-icon :size="20">
              <icon name="el-search"/>
            </el-icon>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="mt-1" v-if="icons.length>0">
      <el-col v-for="(item,index) in iconList" :key="index" :xs="12" :sm="4" :md="3" :lg="2" :xl="2" class="mt-1">
        <div class="flex-center w-full border cursor-pointer" @click="handleCopy(item)">
          <div class="flex-row-center p-1 ">
            <div class="flex-center">
              <icon :name="item" :size="32"/>
            </div>
            <div class="text-xs text-gray-500 w-max">{{ item }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-empty v-else></el-empty>
  </el-card>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page'
import {useDebounceFn, useClipboard} from "@vueuse/core";
import {ref} from "vue";
import {ElMessage} from 'element-plus'

const props = defineProps({
  icons: Array
})

const allIcons = props.icons as Array<string>;
const iconList = ref(allIcons);
const query = ref('')

const handleSearch = useDebounceFn((value) => {
  iconList.value = value ? allIcons.filter(item => item.includes(value)) : allIcons;
}, 200)

const handleCopy = (iconName) => {
  const source = ref(`<icon name="${iconName}"/>`)
  const {copy} = useClipboard({source});
  copy();
  ElMessage.success('复制成功 ' + source.value);
}
</script>