import {useUserStore} from "~/store/modules/user";

export function useUser() {
  const userStore = useUserStore();
  const getUser = userStore.getUser;
  const getToken = userStore.getAccessToken;

  return {
    getUser,
    getToken
  }
}