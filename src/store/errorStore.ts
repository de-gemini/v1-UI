import { create } from 'zustand';

interface ErrorState {
  errorMessage: string;
  setError: (msg: string) => void;
  clearError: () => void;
  successMessage: string;
  setSuccess: (msg: string) => void;
  clearSuccess: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: '',
  setError: (msg) => set({ errorMessage: msg }),
  clearError: () => set({ errorMessage: '' }),
  successMessage: '',
  setSuccess: (msg) => set({ successMessage: msg }),
  clearSuccess: () => set({ successMessage: '' }),
})); 