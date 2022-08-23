import store from "~/store_bak";
import {setting} from "~/settings/projectSetting";

export const setupProjectConfig = async () => {
  const {getters, dispatch} = store;
  if (!getters.getProjectConfig) {
    await dispatch('app/setProjectConfig', setting)
  }
}