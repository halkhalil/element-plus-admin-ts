import store from "~/store";
import {setting} from "~/settings/projectSetting";

export const setupProjectConfig = async () => {
  const {getters, dispatch} = store;
  if (!getters.getProjectConfig) {
    await dispatch('app/setProjectConfig', setting)
  }
}