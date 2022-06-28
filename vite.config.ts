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
  presetIcons,
  presetUno,
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
        symbolId: 'icon-[dir]-[name]',
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
        dts: 'src/components.d.ts',
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
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true,
          }),
        ],
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ]
      }),
    ],
  }
};
