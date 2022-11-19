import {useStore} from "~/store";
import {computed} from "vue";


export function useLocale() {
  const {localeStore} = useStore();

  const getLocale = computed(() => localeStore.getLocale);

  const changeLocale = async (locale) => {
    const langModule = ((await import(`./../locales/lang/${locale}.ts`)) as any).default;
    if (!langModule) return;

    localeStore.setLocalInfo({locale});
  }

  return {
    getLocale,
    changeLocale,
  }
}