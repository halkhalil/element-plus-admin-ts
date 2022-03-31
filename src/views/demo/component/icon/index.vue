<template>
  <PageWrapper :title="$route.meta['title']">
    <el-card shadow="none" header="Element-Plus Icon使用">
      <el-row>
        <el-col v-bind="colProps">
          <el-icon size="30px">
            <help-filled/>
          </el-icon>
        </el-col>
        <el-col v-bind="colProps">
          <el-icon size="30px">
            <loading/>
          </el-icon>
        </el-col>
        <el-col v-bind="colProps">
          <el-icon size="30px">
            <pie-chart/>
          </el-icon>
        </el-col>
        <el-col v-bind="colProps">
          <el-icon size="30px">
            <takeaway-box/>
          </el-icon>
        </el-col>
        <el-col v-bind="colProps">
          <el-icon size="30px">
            <sunrise/>
          </el-icon>
        </el-col>
        <el-col v-bind="colProps">
          <el-icon size="30px">
            <video-pause/>
          </el-icon>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="none" header="iconfont 雪碧图, symbol 引用" class="mt-2">
      <el-alert type="success" :closable="false">
        <p>icon 已注册成全局组件,可直接使用</p>
        <p>如需使用自己的图标库，iconfont官网创建自己的项目后，生成symbol连接，main.js 中引入即可使用</p>
      </el-alert>
      <el-row class="mt-2">
        <el-col v-bind="colProps">
          <icon name="el-github" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="el-notify" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="el-user" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="el-lock" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="el-table" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="el-windows" :size="30"/>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="none" header="使用本地svg文件" class="mt-2">
      <el-alert type="success" :closable="false">
        <p>本地svg文件，以icon-前缀开始,会自动加载/src/assets/svg/目录下的svg文件</p>
        <p>如需自定义，可在vite.config.js中定义</p>
      </el-alert>
      <el-row class="mt-2">
        <el-col v-bind="colProps">
          <icon name="icon-android-fill" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="icon-apple-fill" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="icon-dingtalk" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="icon-gitlab-fill" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <icon name="icon-qq" :size="30"/>
        </el-col>
        <el-col v-bind="colProps">
          <IconSvg name="icon-twitter" :size="30"/>
        </el-col>
      </el-row>
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
import {IconPicker,IconSvg} from '~/components/Icon'
import {ref} from "vue";
import {HelpFilled, Loading, PieChart, TakeawayBox, Sunrise, VideoPause} from '@element-plus/icons'

const colProps = {sm: 8, xs: 8, md: 4, lg: 4, xl: 4};
const iconPicker = ref('');
</script>