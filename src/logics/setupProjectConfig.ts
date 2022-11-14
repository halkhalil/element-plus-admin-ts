import {setting} from "~/settings/projectSetting";
import {isEmpty} from "lodash-es";
import {useStore} from "~/store";

export const setupProjectConfig = () => {
  const {appStore,localeStore} = useStore();

  if (isEmpty(appStore.getProjectConfig)) {
    appStore.setProjectConfig(setting);
  }

  appStore.setTheme(appStore.getProjectConfig?.theme);
  appStore.setLayout(appStore.getProjectConfig?.layout);

  localeStore.initLocale();
}