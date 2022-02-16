import {useStore} from "vuex";
import {computed} from "vue";

export function useLayoutMenus():Object {
  const {getters} = useStore();
  const getMenus = computed(() => getters.getMenus);

  return {
    getMenus
  }
}