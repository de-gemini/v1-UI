import { API_BASE_URL } from "../constants";
import axiosInstance from "./axiosInstance";
import { getAuthHeader } from "./cleaningTimes";

// Types for the API responses
export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface Booking {
  _id: string;
  user: User;
  address: string;
  frequency: "onetime" | "weekly" | "fortnight" | "monthly";
  monthDuration: number;
  endOftenancy: boolean;
  expressStudio: boolean;
  ecofriendlyProduct: boolean;
  errandHours: number;
  havePets: boolean;
  whereToPickKey: string;
  notes: string;
}

export interface Schedule {
  _id: string;
  booking: {
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
      phoneNumber: string;
      address: string;
    };
    scheduledDate: string;
    scheduledTime: string;
    address: string;
    frequency: "onetime" | "weekly" | "fortnight" | "monthly";
    monthDuration: number;
    endOftenancy: boolean;
    expressStudio: boolean;
    ecofriendlyProduct: boolean;
    errandHours: number;
    havePets: boolean;
    whereToPickKey: string;
    notes: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    estimatedPrice: number;
    estimatedDuration: number;
    paymentStatus: string;
  };
  frequency: string;
  startDate: string;
  dayOfWeek: number;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface CalendarDay {
  date: string;
  dayOfWeek: number;
  isAvailable: boolean;
  schedules: {
    _id: string;
    time: string;
    customerName: string;
    address: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    bookingId: string;
  }[];
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDay[];
}

export interface ScheduleStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  monthlyBreakdown: {
    month: number;
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  }[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Updated response interfaces to match actual API response
export interface SchedulesResponse {
  statusCode: number;
  message: string;
  payload: Schedule[];
}

export interface CalendarResponse {
  statusCode: number;
  message: string;
  payload: CalendarMonth;
}

export interface ScheduleResponse {
  statusCode: number;
  message: string;
  payload: Schedule;
}

export interface StatsResponse {
  statusCode: number;
  message: string;
  payload: ScheduleStats;
}

// API functions
export const bookingScheduleService = {
  // Get all schedules with filtering and pagination
  async getSchedules(params?: {
    year?: number;
    month?: number;
    status?: "pending" | "confirmed" | "completed" | "cancelled";
    page?: number;
    limit?: number;
  }): Promise<SchedulesResponse> {
    const queryParams = new URLSearchParams();
    if (params?.year) queryParams.append("year", params.year.toString());
    if (params?.month) queryParams.append("month", params.month.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const response = await axiosInstance.get(
      `${API_BASE_URL}/bookings/admin/schedules?${queryParams.toString()}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get monthly calendar view
  async getCalendarMonth(
    year: number,
    month: number
  ): Promise<CalendarResponse> {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/calendar/month?year=${year}&month=${month}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get single schedule details
  async getSchedule(scheduleId: string): Promise<ScheduleResponse> {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/bookings/schedules/${scheduleId}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Update schedule status
  async updateScheduleStatus(
    scheduleId: string,
    status: "pending" | "confirmed" | "completed" | "cancelled"
  ): Promise<ScheduleResponse> {
    const response = await axiosInstance.patch(
      `${API_BASE_URL}/bookings/schedules/${scheduleId}`,
      { status },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get schedule statistics
  async getScheduleStats(params?: {
    year?: number;
    month?: number;
  }): Promise<StatsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.year) queryParams.append("year", params.year.toString());
    if (params?.month) queryParams.append("month", params.month.toString());

    const response = await axiosInstance.get(
      `${API_BASE_URL}/bookings/schedules/stats?${queryParams.toString()}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Admin: Update schedule status
  async updateScheduleStatusAdmin(
    scheduleId: string,
    status: "pending" | "confirmed" | "completed" | "cancelled"
  ): Promise<ScheduleResponse> {
    const response = await axiosInstance.patch(
      `${API_BASE_URL}/bookings/admin/schedule/${scheduleId}/status`,
      { status },
      { headers: getAuthHeader() }
    );
    return response.data;
  },
};
