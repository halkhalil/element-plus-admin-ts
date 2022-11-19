import {genMessage} from "~/locales/helper";


const modules = import.meta.globEager('./en-US/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en-US'),
  },
};