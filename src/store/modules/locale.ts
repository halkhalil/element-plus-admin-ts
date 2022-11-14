import {defineStore} from "pinia";
import {LocaleSetting, LocaleType} from "#/config";
import {localeSetting} from "~/settings/localeSetting";

interface LocaleState {
  localInfo: LocaleSetting,
}

export const useLocaleStore = defineStore({
  id: 'locale',
  state: (): LocaleState => ({
    localInfo: {
      locale: 'zh_CN',
    }
  }),
  getters: {
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN';
    },
  },
  actions: {
    initLocale() {
      this.setLocalInfo({
        ...localeSetting,
        ...this.localInfo,
      } as LocaleSetting);
    },
    setLocalInfo(localInfo: Partial<LocaleSetting>) {
      this.localInfo = {...this.localInfo, ...localInfo}
    },
  },
  persist: {
    enabled: true
  }
})