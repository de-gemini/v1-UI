import { create } from "zustand";
import type {
  Schedule,
  CalendarMonth,
  ScheduleStats,
} from "../api/bookingSchedules";

import {
  bookingScheduleService,
  // Schedule,
  // CalendarMonth,
  // ScheduleStats,
} from "../api/bookingSchedules";

// Define types locally to avoid import issues

interface BookingScheduleState {
  // State
  schedules: Schedule[];
  calendarMonth: CalendarMonth | null;
  scheduleStats: ScheduleStats | null;
  selectedSchedule: Schedule | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };

  // Actions
  fetchSchedules: (params?: {
    year?: number;
    month?: number;
    status?: "pending" | "confirmed" | "completed" | "cancelled";
    page?: number;
    limit?: number;
  }) => Promise<void>;

  fetchCalendarMonth: (year: number, month: number) => Promise<void>;
  fetchSchedule: (scheduleId: string) => Promise<void>;
  updateScheduleStatus: (
    scheduleId: string,
    status: "pending" | "confirmed" | "completed" | "cancelled"
  ) => Promise<void>;
  updateScheduleStatusAdmin: (
    scheduleId: string,
    status: "pending" | "confirmed" | "completed" | "cancelled"
  ) => Promise<void>;
  fetchScheduleStats: (params?: {
    year?: number;
    month?: number;
  }) => Promise<void>;

  // Utility actions
  setError: (error: string | null) => void;
  clearError: () => void;
  setSelectedSchedule: (schedule: Schedule | null) => void;
}

export const useBookingScheduleStore = create<BookingScheduleState>(
  (set, get) => ({
    // Initial state
    schedules: [],
    calendarMonth: null,
    scheduleStats: null,
    selectedSchedule: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },

    // Actions
    fetchSchedules: async (params = {}) => {
      set({ loading: true, error: null });
      try {
        const response = await bookingScheduleService.getSchedules(params);
        console.log("API Response:", response.payload); // Debug log

        // Handle the actual response structure
        set({
          schedules: response.payload || [],
          pagination: {
            page: params.page || 1,
            limit: params.limit || 10,
            total: response.payload?.length || 0,
            pages: 1, // Default to 1 page since pagination might not be implemented yet
          },
          loading: false,
        });
      } catch (error: any) {
        console.error("API Error:", error); // Debug log
        set({
          error: error?.response?.data?.message || "Failed to fetch schedules",
          loading: false,
        });
      }
    },

    fetchCalendarMonth: async (year, month) => {
      set({ loading: true, error: null });
      try {
        const response = await bookingScheduleService.getCalendarMonth(
          year,
          month
        );
        set({
          calendarMonth: response.payload,
          loading: false,
        });
      } catch (error: any) {
        set({
          error: error?.response?.data?.message || "Failed to fetch calendar",
          loading: false,
        });
      }
    },

    fetchSchedule: async (scheduleId) => {
      set({ loading: true, error: null });
      try {
        const response = await bookingScheduleService.getSchedule(scheduleId);
        set({
          selectedSchedule: response.payload,
          loading: false,
        });
      } catch (error: any) {
        set({
          error: error?.response?.data?.message || "Failed to fetch schedule",
          loading: false,
        });
      }
    },

    updateScheduleStatus: async (scheduleId, status) => {
      set({ loading: true, error: null });
      try {
        const response = await bookingScheduleService.updateScheduleStatus(
          scheduleId,
          status
        );

        // Update the schedule in the list
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule._id === scheduleId
              ? { ...schedule, status, updatedAt: response.payload.updatedAt }
              : schedule
          ),
          selectedSchedule:
            state.selectedSchedule?._id === scheduleId
              ? {
                  ...state.selectedSchedule,
                  status,
                  updatedAt: response.payload.updatedAt,
                }
              : state.selectedSchedule,
          loading: false,
        }));
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to update schedule status",
          loading: false,
        });
      }
    },

    updateScheduleStatusAdmin: async (scheduleId, status) => {
      set({ loading: true, error: null });
      try {
        const response = await bookingScheduleService.updateScheduleStatusAdmin(
          scheduleId,
          status
        );

        // Update the specific schedule status
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule._id === scheduleId
              ? { 
                  ...schedule, 
                  status,
                  updatedAt: response.payload.updatedAt 
                }
              : schedule
          ),
          selectedSchedule:
            state.selectedSchedule?._id === scheduleId
              ? {
                  ...state.selectedSchedule,
                  status,
                  updatedAt: response.payload.updatedAt,
                }
              : state.selectedSchedule,
          loading: false,
        }));
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to update schedule status",
          loading: false,
        });
      }
    },

    fetchScheduleStats: async (params = {}) => {
      set({ loading: true, error: null });
      try {
        const response = await bookingScheduleService.getScheduleStats(params);
        set({
          scheduleStats: response.payload,
          loading: false,
        });
      } catch (error: any) {
        set({
          error: error?.response?.data?.message || "Failed to fetch statistics",
          loading: false,
        });
      }
    },

    // Utility actions
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
    setSelectedSchedule: (schedule) => set({ selectedSchedule: schedule }),
  })
);
