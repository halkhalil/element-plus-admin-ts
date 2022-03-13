import {useStore} from "vuex";
import {computed} from "vue";

export function useLayoutMenus() {
  const {getters} = useStore();
  const getMenus = computed(() => {
    return getters.getMenus;
  });

  return {
    getMenus
  }
}