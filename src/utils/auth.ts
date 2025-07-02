


import { useAuthStore } from "../store/authStore";

export const getToken = () => {
  
  const token = useAuthStore.getState().token;
  return token;
};