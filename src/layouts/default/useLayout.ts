import {computed, onMounted, ref} from "vue";
import {useElementSize} from "@vueuse/core";

export function useLayout() {
  const headerElRef = ref()
  const containerElRef = ref();

  const {height: containerHeight} = useElementSize(containerElRef)
  const {height: headerHeight} = useElementSize(headerElRef)
  const contentHeight = computed(()=>containerHeight.value - headerHeight.value)

  return {
    headerElRef,
    containerElRef,
    headerHeight,
    containerHeight,
    contentHeight,
  }
}