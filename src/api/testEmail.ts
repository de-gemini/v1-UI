import { axiosInstance } from './axiosInstance';

export interface TestEmailRequest {
  to: string;
  name?: string;
}

export interface TestEmailResponse {
  success: boolean;
  message: string;
  sentTo?: string;
  error?: string;
  timestamp: string;
}

export const testEmail = async (data: TestEmailRequest): Promise<TestEmailResponse> => {
  try {
    const response = await axiosInstance.post<TestEmailResponse>('/test-email', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to send test email',
      error: error.response?.data?.message || error.message,
      timestamp: new Date().toISOString(),
    };
  }
}; 