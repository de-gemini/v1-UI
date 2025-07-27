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

// Subscription API functions
export interface CreateSubscriptionParams {
  priceId: string;
  paymentMethodId: string;
  customerEmail: string;
  customerName: string;
  metadata?: Record<string, string>;
}

export const createStripeSubscription = async (params: CreateSubscriptionParams) => {
  const response = await axiosInstance.post(
    '/payments/create-subscription',
    params,
    { headers: getAuthHeader() }
  );
  return response.data;
};

export interface CreateDynamicSubscriptionParams {
  paymentMethodId?: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  currency: string;
  interval: 'week' | 'month';
  intervalCount?: number;
  productName: string;
  metadata?: Record<string, string>;
  subscriptionMonths?: number;
}

export const createDynamicStripeSubscription = async (params: CreateDynamicSubscriptionParams) => {
  const response = await axiosInstance.post(
    '/payments/create-dynamic-subscription',
    params,
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const getCustomerSubscriptions = async (customerId: string) => {
  const response = await axiosInstance.get(
    `/payments/subscriptions/${customerId}`,
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const cancelSubscription = async (subscriptionId: string) => {
  const response = await axiosInstance.post(
    `/payments/subscriptions/${subscriptionId}/cancel`,
    {},
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const pauseSubscription = async (subscriptionId: string) => {
  const response = await axiosInstance.post(
    `/payments/subscriptions/${subscriptionId}/pause`,
    {},
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const resumeSubscription = async (subscriptionId: string) => {
  const response = await axiosInstance.post(
    `/payments/subscriptions/${subscriptionId}/resume`,
    {},
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const fetchPaymentRecords = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/payments/records?page=${page}&limit=${limit}`,
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const updateBookingPaymentMethod = async (bookingId: string, paymentMethod: 'card' | 'cash') => {
  const response = await axiosInstance.patch(
    `/bookings/${bookingId}/payment-method`,
    { paymentMethod },
    { headers: getAuthHeader() }
  );
  return response.data;
}; 