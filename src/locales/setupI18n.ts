import type {App} from 'vue';
import type {I18n, I18nOptions} from 'vue-i18n'

import {createI18n} from 'vue-i18n'
import {useStore} from "~/store";
import {localeSetting} from "~/settings/localeSetting";
import { set } from 'lodash-es';

export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj = {};

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default;
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const moduleName = keyList.shift();
    const objKey = keyList.join('.');

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {});
        set(obj[moduleName], objKey, langFileModule);
      } else {
        set(obj, moduleName, langFileModule || {});
      }
    }
  });
  return obj;
}


const {fallback, availableLocales} = localeSetting;

async function createI18nOptions(): Promise<I18nOptions> {
  const {localeStore} = useStore();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  console.log(options);
  const i18n = createI18n(options) as I18n;
  app.use(i18n);
}