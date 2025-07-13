

// utils/postcodeApi.ts
import axiosInstance from '../api/axiosInstance'; // Assuming you have this set up
import { API_BASE_URL } from '../constants'; // Assuming you have this set up

interface PostcodeApiResponse {
  area?: string;
  message?: string;
}

export const callPostcodeApi = async (
  postcode: string,
  onSuccess: (area: string) => void,
  onError: (message: string) => void
): Promise<void> => {
  if (!postcode.trim()) {
    onError('Please enter a postcode.');
    return;
  }

  try {
    const res = await axiosInstance.post<PostcodeApiResponse>(`${API_BASE_URL}/postcode`, { postcode });

    if (res.data?.area) {
      onSuccess(res.data.area);
    } else {
      onError('Invalid postcode or area not found.');
    }
  } catch (err: any) {
    const msg = err?.response?.data?.message || err.message || 'An error occurred';
    onError(msg);
  }
};