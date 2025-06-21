import axiosInstance from './axiosInstance';
import {getAuthHeader} from './cleaningTimes'
import { API_BASE_URL } from '../constants';

export const fetchMonthAvailability = async (year: number, month: number) => {
  const res = await axiosInstance.get(`${API_BASE_URL}/calendar/month?year=${year}&month=${month}`);
  return res.data.payload;
};

export const toggleDayAvailability = async (
  year: number,
  month: number,
  day: number,
  available: boolean,
  note?: string
) => {
  const res = await axiosInstance.post(`${API_BASE_URL}/calendar`,
     {
    year,
    month,
    day,
    available,
    note,
  },
  {
    headers: getAuthHeader()
  },
);
  return res.data.data;
}; 