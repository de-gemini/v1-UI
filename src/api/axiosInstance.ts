import axios from 'axios';
import { useErrorStore } from '../store/errorStore';
import { API_BASE_URL } from '../constants';
import ErrorHandler from '../utils/errorHandler';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Use the ErrorHandler to sanitize the error message
    const sanitizedMessage = ErrorHandler.getErrorMessage(error, 'AxiosInterceptor');
    
    // Use setTimeout to avoid Zustand hook call in render
    setTimeout(() => {
      useErrorStore.getState().setError(sanitizedMessage);
    }, 0);
    return Promise.reject(error);
  }
);

export default axiosInstance; 