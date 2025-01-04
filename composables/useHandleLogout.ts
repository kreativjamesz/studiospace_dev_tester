import { useRouter } from "#imports";
import { useUserDataStore } from "@/stores/userDataStore";

export const useHandleLogout = () => {
  const router = useRouter();
  const userDataStore = useUserDataStore();

  return () => {
    userDataStore.$reset(); // Clear user data
    router.push("/"); // Redirect to login
  };
};
