import {useRootSetting} from "~/composables/setting/useRootSeeting";
import {LayoutSidebar, LayoutHeader, LayoutContent, LayoutFeature, LayoutTagView} from '~/layouts/common'
import {useHeaderSetting} from "~/composables/setting/useHeaderSeeting";
import {computed, defineComponent, unref, render} from "vue";
import LayoutMix from "~/layouts/LayoutMix.vue";
import LayoutAside from "~/layouts/LayoutAside.vue";
import LayoutTopMenu from "~/layouts/LayoutTopMenu.vue";
import {valid} from "mockjs";


export default defineComponent({
  name: 'Layout',
  setup() {

    const {getHeaderFixed} = useHeaderSetting();
    const {getIsMixMode, getIsSidebarMode, getIsTopMenuMode, getShowTagView} = useRootSetting();


    const renderHeader = () => {
      const header = () => (<LayoutHeader/>)
      const fixedHeader = () => (<el-header height="auto"><LayoutHeader/></el-header>)
      return getIsMixMode.value || getHeaderFixed.value ? fixedHeader() : header()
    }

    const renderTagView = () => (<el-header height="auto"><LayoutTagView/></el-header>)
    const renderSidebar = () => (<el-aside width='auto'><LayoutSidebar/></el-aside>)

    const renderContent = () => {
      return (
        <el-main>
          <el-scrollbar>
            {(!getHeaderFixed.value && !getIsMixMode.value) ? renderHeader() : null}
            {(!getHeaderFixed.value && !getIsMixMode.value) ? renderTagView() : null}
            <LayoutContent/>
          </el-scrollbar>
        </el-main>
      )
    }

    // 左侧菜单
    const layoutAside = () => {
      return (
        <el-container>
          {renderSidebar()}
          <el-container>
            {getHeaderFixed.value ? renderHeader() : null}
            {getHeaderFixed.value ? renderTagView() : null}
            <el-main>
              <el-scrollbar>
                {!getHeaderFixed.value ? renderHeader() : null}
                {!getHeaderFixed.value ? renderTagView() : null}
                <LayoutContent/>
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      )
    }

    // 混合菜单
    const layoutMix = () => {
      return (
        <el-container>
          {renderHeader()}
          <el-container>
            {renderSidebar()}
            <el-container>
              {renderTagView()}
              <el-main>
                <el-scrollbar>
                  <LayoutContent/>
                </el-scrollbar>
              </el-main>
            </el-container>
          </el-container>
        </el-container>
      )
    }
    const layoutTopMenu = () => {
      return (
        <el-container>
          {getHeaderFixed.value ? renderHeader() : null}
          {getHeaderFixed.value ? renderTagView() : null}
          {renderContent()}
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