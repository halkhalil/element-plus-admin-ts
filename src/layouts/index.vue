<script lang="tsx">
import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {LayoutSidebar, LayoutHeader, LayoutContent, LayoutFeature, LayoutTab, LayoutFooter} from '~/layouts/common'
import {useHeaderSetting} from "~/composables/setting/useHeaderSeeting";
import {defineComponent} from "vue";


export default defineComponent({
  name: 'Layout',
  setup() {
    const {getHeaderFixed} = useHeaderSetting();
    const {getIsMixMode, getIsSidebarMode, getShowTab} = useRootSetting();

    const renderTab = () => (<LayoutTab/>)
    const renderTabFixed = () => (<el-header height="auto">{renderTab()}</el-header>)

    const renderHeader = () => {
      const header = () => (
        <>
          <LayoutHeader/>
          {getShowTab.value && !getIsMixMode.value ? renderTab() : null}
        </>
      )
      const headerFixed = () => (<el-header height="auto">{header()}</el-header>)
      return getIsMixMode.value || getHeaderFixed.value ? headerFixed() : header()
    }

    const renderFooter = () => (
      <el-footer height="60px" class="p-1"><LayoutFooter/></el-footer>
    )

    const renderAside = () => (<el-aside width='auto'><LayoutSidebar/></el-aside>)

    // 左侧菜单模式
    const layoutAside = () => {
      return (
        <el-container>
          {renderAside()}
          <el-container direction='vertical'>
            {getHeaderFixed.value ? renderHeader() : null}
            <el-main>
              <el-scrollbar view-class="h-full" wrap-class="h-full">
                {!getHeaderFixed.value ? renderHeader() : null}
                <LayoutContent class="p-2"/>
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      )
    }

    // 混合菜单模式
    const layoutMix = () => {
      return (
        <el-container direction='horizontal'>
          {renderAside()}
          <el-container direction='vertical'>
            {renderHeader()}
            {getShowTab.value ? renderTabFixed() : null}
            <el-main>
              <el-scrollbar view-class="h-full">
                <LayoutContent class="p-2"/>
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      )
    }

    // 顶部菜单模式
    const layoutTopMenu = () => {
      return (
        <el-container direction='vertical'>
          {getHeaderFixed.value ? renderHeader() : null}
          <el-main>
            <el-scrollbar view-class="h-full">
              {!getHeaderFixed.value ? renderHeader() : null}
              <LayoutContent class="p-2"/>
            </el-scrollbar>
          </el-main>
        </el-container>
      )
    }

    return () => (
      <>
        <LayoutFeature/>
        {getIsSidebarMode.value ? layoutAside() : getIsMixMode.value ? layoutMix() : layoutTopMenu()}
      </>
    )
  }
})
</script>