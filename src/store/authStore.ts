import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Test account credentials
const TEST_EMAIL = 'admin@geminicleaning.com';
const TEST_PASSWORD = 'admin123';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test account validation
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        set({ isAuthenticated: true, user: { email } });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
})); 