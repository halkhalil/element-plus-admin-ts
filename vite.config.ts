import {resolve} from "path";
import {ConfigEnv, UserConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {viteMockServe} from "vite-plugin-mock";
import viteSvgIcons from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import Components from "unplugin-vue-components/vite";
import vueJsx from '@vitejs/plugin-vue-jsx';
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import WindiCSS from 'vite-plugin-windicss'
import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({command}: ConfigEnv): UserConfig => {
  return {
    base: '/element-plus-admin/',
    resolve: {
      alias: {
        "~": pathResolve('src') + '/',
      },
    },
    define: {
      'process.env': {},
      'process.platform': null,
      'process.version': null,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      viteSvgIcons({
        iconDirs: [pathResolve('src/assets/svg')],
        symbolId: 'svg-[dir]-[name]',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve' || command === 'build',
        // prodEnabled: true,
        injectCode: `
        import { setupProdMockServer } from '/mock/index.ts';
        setupProdMockServer();
      `,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss({
        presets: [
          presetWind(),
          presetAttributify(),
        ],
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ],
        rules: [
          ['text-xl', {'font-size': 'var(--el-font-size-extra-large)'}],
          ['text-lg', {'font-size': 'var(--el-font-size-large)',color:'--el-bg-color:red'}],
          ['text-md', {'font-size': 'var(--el-font-size-medium)'}],
          ['text-base', {'font-size': 'var(--el-font-size-base)'}],
          ['text-sm', {'font-size': 'var(--el-font-size-small)'}],
          ['text-xs', {'font-size': 'var(--el-font-size-extra-small)'}],
          ['text-primary', {'color': 'var(--el-text-color-primary)'}],
          ['text-regular', {'color': 'var(--el-text-color-regular)'}],
          ['text-secondary', {'color': 'var(--el-text-color-secondary)'}],
          ['border-darker', {'color': 'var(--el-border-color-darker)'}],
          ['border-dark', {'color': 'var(--el-border-color-dark)'}],
          ['border-base', {'color': 'var(--el-border-color)'}],
          ['border-light', {'color': 'var(--el-border-color-light)'}],
          ['border-lighter', {'color': 'var(--el-border-color-lighter)'}],
          ['border-extra-light', {'color': 'var(--el-border-color-extra-light)'}],
        ],
        theme:{
          extend: {
            colors: {
              bg_color: "var(--el-bg-color)",
              primary: "var(--el-color-primary)",
              primary_light_9: "var(--el-color-primary-light-9)",
              text_color_primary: "var(--el-text-color-primary)",
              text_color_regular: "var(--el-text-color-regular)",
              text_color_disabled: "var(--el-text-color-disabled)"
            }
          }
        },
      }),
    ],
  }
};
