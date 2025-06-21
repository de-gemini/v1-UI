import axiosInstance from './axiosInstance';
import { API_BASE_URL } from '../constants';

export function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAllCleaningTimes = async () => {
  const res = await axiosInstance.get(`${API_BASE_URL}/cleaning-times/active`, {
    headers: getAuthHeader(),
  });
  return res.data.payload; // assuming payload contains the list
};

export const createCleaningTime = async (data: { name: string; cleaningTime: number }) => {
  const res = await axiosInstance.post(`${API_BASE_URL}/cleaning-times`, data, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const updateCleaningTime = async (id: string, cleaningTime: number) => {
  const res = await axiosInstance.patch(
    `${API_BASE_URL}/cleaning-times/${id}`,
    { cleaningTime },
    { headers: getAuthHeader() }
  );
  return res.data;
};

export const deleteCleaningTime = async (id: string) => {
  const res = await axiosInstance.delete(
    `${API_BASE_URL}/cleaning-times/${id}`,
    { headers: getAuthHeader() }
  );
  return res.data;
};

// You can add more functions for PATCH, DELETE, etc. as needed 