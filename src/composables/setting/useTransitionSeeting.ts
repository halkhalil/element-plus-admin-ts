import {computed, unref} from 'vue'
import {useAppStore} from "~/store/modules/app";
import {TransitionSetting} from "#/config";
import {TransitionEnum} from "~/enums/app";

/**
 * 动画设置
 * @returns {{getOpenNProgress: ComputedRef<boolean|*>, toggleEnableTransition: (function(): Promise<void>), toggleOpenNProgress: (function(): Promise<void>), setBasicTransition: (function(*=): Promise<void>), toggleOpenPageLoading: (function(): Promise<void>), getEnableTransition: ComputedRef<*>, getBasicTransition: ComputedRef<string|string|*>}}
 */
export function useTransitionSetting() {

  const appStore = useAppStore();
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