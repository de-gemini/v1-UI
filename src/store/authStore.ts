import { create } from 'zustand';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  phone?: string;
  surname?: string;
  address?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    address: string;
  }) => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  isAdmin: localStorage.getItem('role') === 'admin',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  token: localStorage.getItem('token'),
  login: async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { access_token, user } = res.data.payload;
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
  register: async (data) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, data);
    } catch (error) {
      throw error;
    }
  },
})); 