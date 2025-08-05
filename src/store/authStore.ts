import { create } from 'zustand';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { isTokenValid } from '../utils/isTokenValid';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  phone?: string;
  phoneNumber?: string; // Backend field name
  surname?: string;
  address?: string;
  firstName?: string; // Add this
  lastName?: string;  // Add this
}

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    address: string;
  }) => Promise<void>;
}

// Helper function to get valid auth state from localStorage
const getValidAuthState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const role = localStorage.getItem('role');
  
  // Check if token is valid
  if (!isTokenValid(token)) {
    // Clear invalid data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    return {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
      token: null,
    };
  }
  
  // Token is valid, return auth state
  return {
    isAuthenticated: true,
    isAdmin: role === 'admin',
    user: user ? JSON.parse(user) : null,
    token,
  };
};

export const useAuthStore = create<AuthState>((set) => {
  // Initialize with valid auth state
  const initialState = getValidAuthState();
  
  return {
    ...initialState,
    login: async (email: string, password: string) => {
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        const { access_token, user } = res.data.payload;
        if (!user) {
          throw new Error('No user data received from login');
        }
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.role);
        set({
          isAuthenticated: true,
          isAdmin: user.role === 'admin',
          user,
          token: access_token,
        });
      } catch (error) {
        set({ isAuthenticated: false, isAdmin: false, user: null, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        throw error;
      }
    },
    logout: () => {
      set({ isAuthenticated: false, isAdmin: false, user: null, token: null });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
    fetchUserProfile: async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token available');
        }
        
        const res = await axios.get(`${API_BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const userData = res.data.payload;
        if (!userData) {
          throw new Error('No user data received from server');
        }
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
      }
    },
    register: async (data) => {
      try {
        await axios.post(`${API_BASE_URL}/auth/register`, data);
      } catch (error) {
        throw error;
      }
    },
  };
}); 