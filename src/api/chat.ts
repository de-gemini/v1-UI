import axiosInstance from './axiosInstance';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

// User chat functions
export const getUserChat = async () => {
  const response = await axiosInstance.get('/chat/user', { headers: getAuthHeader() });
  return response.data;
};

export const startChat = async (message: string) => {
  const response = await axiosInstance.post('/chat/user/start', { message }, { headers: getAuthHeader() });
  return response.data;
};

export const sendUserMessage = async (message: string) => {
  const response = await axiosInstance.post('/chat/user/message', { message }, { headers: getAuthHeader() });
  return response.data;
};

// Admin chat functions
export const getAllChats = async () => {
  const response = await axiosInstance.get('/chat/admin/all', { headers: getAuthHeader() });
  return response.data;
};

export const getActiveChats = async () => {
  const response = await axiosInstance.get('/chat/admin/active', { headers: getAuthHeader() });
  return response.data;
};

export const getUnresolvedChatCount = async () => {
  const response = await axiosInstance.get('/chat/admin/unresolved-count', { headers: getAuthHeader() });
  return response.data;
};

export const getChatById = async (chatId: string) => {
  const response = await axiosInstance.get(`/chat/admin/${chatId}`, { headers: getAuthHeader() });
  return response.data;
};

export const sendAdminMessage = async (chatId: string, message: string) => {
  const response = await axiosInstance.post(`/chat/admin/${chatId}/message`, { message }, { headers: getAuthHeader() });
  return response.data;
};

export const resolveChat = async (chatId: string) => {
  const response = await axiosInstance.patch(`/chat/admin/${chatId}/resolve`, {}, { headers: getAuthHeader() });
  return response.data;
}; 