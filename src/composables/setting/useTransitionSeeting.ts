import {computed, unref} from 'vue'
import {TransitionSetting} from "#/config";
import {TransitionEnum} from "~/enums/app";
import {useStore} from "~/store";


export function useTransitionSetting() {

  const {appStore} = useStore();
  const getTransitionSetting = appStore.getTransitionSetting;
  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable);
  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress);
  const getOpenPageLoading = computed(() => appStore.getTransitionSetting?.openPageLoading);
  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition);

  async function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({transitionSetting: {...getTransitionSetting, ...transitionSetting}})
  }

  async function setBasicTransition(name: TransitionEnum) {
    await setTransitionSetting({basicTransition: name});
  }

  async function toggleEnableTransition() {
    await setTransitionSetting({enable: !unref(getEnableTransition)});
  }

  async function toggleOpenNProgress() {
    await setTransitionSetting({openNProgress: !unref(getOpenNProgress)});
  }

  async function toggleOpenPageLoading() {
    await setTransitionSetting({openPageLoading: !unref(getOpenPageLoading)});
  }

  return {
    setBasicTransition,
    toggleEnableTransition,
    toggleOpenNProgress,
    toggleOpenPageLoading,
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}