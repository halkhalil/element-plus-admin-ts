import {computed} from "vue";
import {useStore} from "~/store";

export function useUser() {
  const {userStore} = useStore()

  return {
    getUser: userStore.getUser,
    getToken: userStore.getToken
  }
}