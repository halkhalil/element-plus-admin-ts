import {resolve} from "path";
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import viteSvgIcons from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  base: '/element-plus-admin',
  resolve: {
    alias: {
      '@': pathResolve('src') + '/',
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
        additionalData: `@use "~/styles/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    viteSvgIcons({
      iconDirs: [pathResolve('src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    Components({
      resolvers: [
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
  ],
});
