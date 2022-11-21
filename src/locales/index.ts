import type {App} from 'vue';
import type {I18n, I18nOptions} from 'vue-i18n'
import {createI18n} from 'vue-i18n'
import {localeSetting} from "~/settings/localeSetting";
import {useStore} from "~/store";


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
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  };
}


// 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除
export const $t = (key: string) => key;

export let i18n;

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}
