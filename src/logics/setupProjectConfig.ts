import {setting} from "~/settings/projectSetting";
import {isEmpty} from "lodash-es";
import {useStore} from "~/store";

export const setupProjectConfig = () => {
  const {appStore} = useStore();

  if (isEmpty(appStore.getProjectConfig)) {
    appStore.setProjectConfig(setting);
  }
}