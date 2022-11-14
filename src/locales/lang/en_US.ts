import {genMessage} from "~/locales/setupI18n";

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en-US'),
  },
};