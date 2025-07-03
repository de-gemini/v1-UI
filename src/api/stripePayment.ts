import axiosInstance from './axiosInstance';

export function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const createStripePaymentIntent = async (bookingId: string) => {
  const response = await axiosInstance.post(
    '/payments/create-payment-intent',
    { bookingId },
    { headers: getAuthHeader() }
  );
  return response.data;
}; 