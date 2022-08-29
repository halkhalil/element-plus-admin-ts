import {computed} from "vue";
import {useStore} from "~/store";

export function useUser() {
  const {userStore} = useStore()
  const getUser = computed(() => userStore.getUser);
  const getToken = computed(() => userStore.getToken);

  return {
    getUser,
    getToken
  }
}