import axios from 'axios';
import { useErrorStore } from '../store/errorStore';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    // Use setTimeout to avoid Zustand hook call in render
    setTimeout(() => {
      useErrorStore.getState().setError(message);
    }, 0);
    return Promise.reject(error);
  }
);

export default axiosInstance; 