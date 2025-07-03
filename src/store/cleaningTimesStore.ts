import { create } from 'zustand';
import { getAllCleaningTimes, createCleaningTime, updateCleaningTime, deleteCleaningTime } from '../api/cleaningTimes';
import { useErrorStore } from './errorStore';

interface CleaningTime {
  _id: string;
  name: string;
  cleaningTime: number;
}

interface CleaningTimesState {
  cleaningTimes: CleaningTime[];
  loading: boolean;
  showAddRoomForm: boolean;
  rowLoading: { [id: string]: boolean };
  editValues: { [id: string]: string };
  message: { type: string; text: string };
  fetchCleaningTimes: () => Promise<void>;
  addCleaningTime: (payload: { name: string; cleaningTime: number }) => Promise<void>;
  updateCleaningTimeValue: (id: string, cleaningTime: number) => Promise<void>;
  deleteCleaningTimeValue: (id: string) => Promise<void>;
  setShowAddRoomForm: (show: boolean) => void;
  setEditValue: (id: string, value: string) => void;
  clearMessage: () => void;
}

export const useCleaningTimesStore = create<CleaningTimesState>((set, get) => ({
  cleaningTimes: [],
  loading: false,
  showAddRoomForm: false,
  rowLoading: {},
  editValues: {},
  message: { type: '', text: '' },
  fetchCleaningTimes: async () => {
    set({ loading: true });
    try {
      const data = await getAllCleaningTimes();
      set({ cleaningTimes: Array.isArray(data) ? data : [] });
      // Initialize edit values
      const initialEdit: { [id: string]: string } = {};
      (Array.isArray(data) ? data : []).forEach((room: CleaningTime) => {
        initialEdit[room._id] = room.cleaningTime.toString();
      });
      set({ editValues: initialEdit });
    } catch (err) {
      set({ message: { type: 'error', text: 'Failed to fetch cleaning times.' } });
    } finally {
      set({ loading: false });
    }
  },
  addCleaningTime: async (payload: { name: string; cleaningTime: number }) => {
    try {
      await createCleaningTime(payload);
      set({ message: { type: 'success', text: 'Room added successfully!' }, showAddRoomForm: false });
      useErrorStore.getState().setSuccess('Room added successfully!');
      await get().fetchCleaningTimes();
    } catch (err) {
      set({ message: { type: 'error', text: 'Failed to add room.' } });
    }
  },
  updateCleaningTimeValue: async (id, cleaningTime) => {
    set(state => ({ rowLoading: { ...state.rowLoading, [id]: true } }));
    try {
      await updateCleaningTime(id, cleaningTime);
      useErrorStore.getState().setSuccess('Room updated successfully!');
      await get().fetchCleaningTimes();
    } catch (err) {
      // error handled globally
    } finally {
      set(state => ({ rowLoading: { ...state.rowLoading, [id]: false } }));
    }
  },
  deleteCleaningTimeValue: async (id) => {
    set(state => ({ rowLoading: { ...state.rowLoading, [id]: true } }));
    try {
      await deleteCleaningTime(id);
      useErrorStore.getState().setSuccess('Room deleted successfully!');
      await get().fetchCleaningTimes();
    } catch (err) {
      // error handled globally
    } finally {
      set(state => ({ rowLoading: { ...state.rowLoading, [id]: false } }));
    }
  },
  setShowAddRoomForm: (show) => set({ showAddRoomForm: show }),
  setEditValue: (id, value) => set(state => ({ editValues: { ...state.editValues, [id]: value } })),
  clearMessage: () => set({ message: { type: '', text: '' } }),
})); 