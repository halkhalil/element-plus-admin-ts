import {useStore} from "~/store";
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import {i18n} from "~/locales";


export function useLocale() {
  const {localeStore} = useStore();

  const getLocale = computed(() => localeStore.getLocale);
  const getElementLocale = computed(() => i18n.global.getLocaleMessage([localeStore.getLocale])?.elementLocale);

  const changeLocale = async (locale) => {
    const langModule = ((await import(`./../locales/lang/${locale}.ts`)) as any).default;
    if (!langModule) return;

    localeStore.setLocalInfo({locale});
  }


  return {
    getLocale,
    getElementLocale,
    changeLocale,
    ...useI18n(),
  }
}