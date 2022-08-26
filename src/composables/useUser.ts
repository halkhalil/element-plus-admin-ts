import {useUserStore} from "~/store/modules/user";
import {computed} from "vue";

export function useUser() {
  const userStore = useUserStore();
  const getUser = computed(() => userStore.getUser);
  const getToken = computed(() => userStore.getToken);

  return {
    getUser,
    getToken
  }
}