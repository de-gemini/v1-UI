import axiosInstance from './axiosInstance';

export const trackVisitor = (path: any) => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2);
    localStorage.setItem('sessionId', sessionId);
  }
  return axiosInstance.post('/visitors/track', { path, sessionId });
};

export const fetchVisitorStats = () =>
  axiosInstance.get('/visitors/stats'); 