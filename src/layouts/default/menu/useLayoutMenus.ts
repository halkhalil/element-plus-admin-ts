import {useStore} from "vuex";
import {computed} from "vue";

export function useLayoutMenus():Object {
  const {getters} = useStore();
  const getMenus = computed(() => {
    console.log('getters.getMenus',getters.getMenus);
    return getters.getMenus;
  } );

  return {
    getMenus
  }
}