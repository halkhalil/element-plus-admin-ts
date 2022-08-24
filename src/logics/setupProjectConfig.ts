import {setting} from "~/settings/projectSetting";
import {useAppStore} from "~/store/modules/app";
import {isEmpty} from "lodash-es";

export const setupProjectConfig = async () => {
  const appStore = useAppStore();

  if (isEmpty(appStore.getProjectConfig)) {
    appStore.setProjectConfig(setting);
  }
}