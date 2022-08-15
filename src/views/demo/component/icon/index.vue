<template>
  <PageWrapper :title="$route.meta['title']">
    <el-card shadow="none" header="Element-Plus Icon使用">
      <div class="grid grid-cols-6">
        <el-icon :size="30">
          <help-filled/>
        </el-icon>
        <el-icon :size="30">
          <loading/>
        </el-icon>
        <el-icon :size="30">
          <pie-chart/>
        </el-icon>
        <el-icon :size="30">
          <takeaway-box/>
        </el-icon>
        <el-icon :size="30">
          <sunrise/>
        </el-icon>
        <el-icon :size="30">
          <video-pause/>
        </el-icon>
      </div>
    </el-card>
    <el-card shadow="none" header="Iconify" class="mt-2">
      <div class="grid grid-cols-6 mt-2">
        <Icon icon="ep:add-location" :width="30"/>
        <Icon icon="ep:chat-dot-round" :width="30"/>
        <Icon icon="ep:data-line" :width="30"/>
        <Icon icon="ep:grid" :width="30"/>
        <Icon icon="ep:headset" :width="30"/>
        <Icon icon="ep:ice-tea" :width="30"/>
      </div>
    </el-card>
    <el-card shadow="none" header="使用本地svg文件" class="mt-2">
      <el-alert type="info" closable show-icon>
        本地svg文件，以 <code class="color-red">svg-</code>前缀开始,会自动加载/src/assets/svg/目录下的svg文件
      </el-alert>
      <div class="grid grid-cols-6 mt-2">
        <IconSvg icon="svg-android-fill" :size="30"/>
        <IconSvg icon="svg-apple-fill" :size="30"/>
        <IconSvg icon="svg-dingtalk" :size="30"/>
        <IconSvg icon="svg-gitlab-fill" :size="30"/>
        <IconSvg icon="svg-qq" :size="30"/>
        <IconSvg icon="svg-twitter" :size="30"/>
      </div>
    </el-card>
    <el-card shadow="none" header="图标选择器" class="mt-2">
      <el-row>
        <el-col>
          <IconPicker v-model="iconPicker" placement="top"/>
        </el-col>
      </el-row>
    </el-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page'
import {IconPicker, IconSvg} from '~/components/Icon'
import {ref} from "vue";
import {HelpFilled, Loading, PieChart, TakeawayBox, Sunrise, VideoPause} from '@element-plus/icons'

const colProps = {sm: 8, xs: 8, md: 4, lg: 4, xl: 4};
const iconPicker = ref('');
</script>