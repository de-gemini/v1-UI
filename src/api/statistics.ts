import axiosInstance from './axiosInstance';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchTotalBookings = () =>
  axiosInstance.get('/admin/statistics/total-bookings', { headers: getAuthHeader() });

export const fetchCompletedBookings = () =>
  axiosInstance.get('/admin/statistics/completed-bookings', { headers: getAuthHeader() });

export const fetchPendingBookings = () =>
  axiosInstance.get('/admin/statistics/pending-bookings', { headers: getAuthHeader() });

export const fetchTotalRevenue = () =>
  axiosInstance.get('/admin/statistics/total-revenue', { headers: getAuthHeader() });

export const fetchNewCustomers = () =>
  axiosInstance.get('/admin/statistics/new-customers', { headers: getAuthHeader() });

export const fetchPendingConfirmationBookings = (limit = 10) =>
  axiosInstance.get(`/admin/statistics/pending-confirmation-bookings?limit=${limit}`, { headers: getAuthHeader() });

export const fetchRecentBookings = (limit = 10) =>
  axiosInstance.get(`/admin/statistics/recent-bookings?limit=${limit}`, { headers: getAuthHeader() });

export const fetchTopCustomers = (limit = 5) =>
  axiosInstance.get(`/admin/statistics/top-customers?limit=${limit}`, { headers: getAuthHeader() });

export const fetchTopServices = (limit = 5) =>
  axiosInstance.get(`/admin/statistics/top-services?limit=${limit}`, { headers: getAuthHeader() });

export const fetchUpcomingBookings = (limit = 10) =>
  axiosInstance.get(`/admin/statistics/upcoming-bookings?limit=${limit}`, { headers: getAuthHeader() });

export const fetchDailyVisitors = () =>
  axiosInstance.get('/admin/statistics/daily-visitors', { headers: getAuthHeader() }); 