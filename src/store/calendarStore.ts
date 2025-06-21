import { create } from 'zustand';
import { fetchMonthAvailability, toggleDayAvailability } from '../api/calendar';

interface DayAvailability {
  day: number;
  available: boolean;
  note?: string;
}

interface CalendarState {
  monthAvailability: DayAvailability[];
  loading: boolean;
  error: string | null;
  updatingDay: number | null;
  fetchAvailability: (year: number, month: number) => Promise<void>;
  toggleAvailability: (year: number, month: number, day: number, available: boolean, note?: string) => Promise<void>;
  setError: (msg: string | null) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  monthAvailability: [],
  loading: false,
  error: null,
  updatingDay: null,

  fetchAvailability: async (year, month) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchMonthAvailability(year, month);
      set({ monthAvailability: data });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || 'Failed to fetch availability' });
    } finally {
      set({ loading: false });
    }
  },

  toggleAvailability: async (year, month, day, available, note) => {
    set({ updatingDay: day, error: null });
    // Optimistic update
    set(state => {
      const days = Array.isArray(state.monthAvailability) ? state.monthAvailability : [];
      const exists = days.some(d => d.day === day);
      let updated;
      if (exists) {
        updated = days.map(d =>
          d.day === day ? { ...d, available } : d
        );
      } else {
        updated = [...days, { day, available }];
      }
      return { monthAvailability: updated };
    });
    try {
      await toggleDayAvailability(year, month, day, available, note);
      await get().fetchAvailability(year, month); // sync with backend
    } catch (err: any) {
      set({ error: err?.response?.data?.message || 'Failed to update day' });
    } finally {
      set({ updatingDay: null });
    }
  },

  setError: (msg) => set({ error: msg }),
})); 