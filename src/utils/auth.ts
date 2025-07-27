


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/authStore";
import { isTokenValid } from "./isTokenValid";
import { toast } from 'react-toastify';

export const getToken = () => {
  const token = useAuthStore.getState().token;
  return token;
};

// Specific validation for admin routes
export const validateAdminToken = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  if (!isTokenValid(token)) {
    return { isValid: false, reason: 'token_expired' };
  }
  
  if (!user) {
    return { isValid: false, reason: 'no_user_data' };
  }
  
  try {
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      return { isValid: false, reason: 'not_admin' };
    }
    
    return { isValid: true, user: userData };
  } catch (error) {
    return { isValid: false, reason: 'invalid_user_data' };
  }
};

// Hook for validating authentication and redirecting if needed
export const useAuthValidation = (redirectTo: string = '/login') => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");
      if (!isTokenValid(token)) {
        // Token is invalid or expired, clear auth state and redirect
        logout();
        
        // Provide specific feedback based on the route being accessed
        const isAdminRoute = window.location.pathname.startsWith('/admin');
        if (isAdminRoute) {
          toast.info('Admin session expired. Please login again with admin credentials.');
        } else {
          toast.info('Your session has expired. Please login again.');
        }
        
        navigate(redirectTo);
        return;
      }
      setIsValidating(false);
    };

    validateToken();
  }, [navigate, logout, redirectTo]);

  return { isAuthenticated, isValidating, isAdmin };
};