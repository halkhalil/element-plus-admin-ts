import elementLocale from 'element-plus/dist/locale/zh-cn.mjs'
import {genMessage} from "~/locales/helper";


const modules = import.meta.globEager('./zh-CN/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    elementLocale,
  },
};