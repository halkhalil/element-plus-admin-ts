import zhLocale from "element-plus/lib/locale/lang/zh-cn"
import {genMessage} from "~/locales/helper";


const modules = import.meta.globEager('./zh-CN/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    ...zhLocale,
  },
};