import axiosInstance from './axiosInstance';
import { getAuthHeader } from './cleaningTimes';
import { API_BASE_URL } from '../constants';

export interface SystemSettings {
  _id: string;
  name: string;
  settings: {
    reminderEmails: {
      enabled: boolean;
      frequency: 'none' | '4hours' | '12hours' | '24hours' | 'custom';
      customHours?: number;
    };
    bookingPrevention: {
      enabled: boolean;
    };
    businessHours: {
      start: string;
      end: string;
    };
    minimumBookingNotice: number;
    maxBookingsPerDay: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ReminderEmailSettings {
  enabled: boolean;
  frequency: 'none' | '4hours' | '12hours' | '24hours' | 'custom';
  customHours?: number;
}

export interface BookingPreventionSettings {
  enabled: boolean;
}

export interface SystemSettingsResponse {
  statusCode: number;
  message: string;
  payload: SystemSettings;
}

export interface BookingPreventionStatusResponse {
  statusCode: number;
  message: string;
  payload: {
    isEnabled: boolean;
  };
}

export const systemSettingsService = {
  // Get all system settings
  async getSettings(): Promise<SystemSettingsResponse> {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/system-settings`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Update reminder email settings
  async updateReminderEmails(settings: ReminderEmailSettings): Promise<SystemSettingsResponse> {
    const response = await axiosInstance.patch(
      `${API_BASE_URL}/system-settings/reminder-emails`,
      settings,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Update booking prevention settings
  async updateBookingPrevention(settings: BookingPreventionSettings): Promise<SystemSettingsResponse> {
    const response = await axiosInstance.patch(
      `${API_BASE_URL}/system-settings/booking-prevention`,
      settings,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Check booking prevention status
  async getBookingPreventionStatus(): Promise<BookingPreventionStatusResponse> {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/system-settings/booking-prevention-status`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },
}; 