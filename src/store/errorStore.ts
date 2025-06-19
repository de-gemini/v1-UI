import { create } from 'zustand';

interface ErrorState {
  errorMessage: string;
  setError: (msg: string) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: '',
  setError: (msg) => set({ errorMessage: msg }),
  clearError: () => set({ errorMessage: '' }),
})); 