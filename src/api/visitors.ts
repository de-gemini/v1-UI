import axiosInstance from './axiosInstance';

// Debounce tracking calls to prevent duplicates
let trackingTimeout: ReturnType<typeof setTimeout> | null = null;
let lastTrackedPath: string | null = null;

export const trackVisitor = (path: any) => {
  // Clear any existing timeout
  if (trackingTimeout) {
    clearTimeout(trackingTimeout);
  }

  // Don't track if it's the same path we just tracked
  if (lastTrackedPath === path) {
    return Promise.resolve();
  }

  // Debounce the tracking call
  return new Promise((resolve) => {
    trackingTimeout = setTimeout(async () => {
      try {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2);
          localStorage.setItem('sessionId', sessionId);
        }
        
        await axiosInstance.post('/visitors/track', { path, sessionId });
        lastTrackedPath = path;
        resolve(true);
      } catch (error) {
        console.error('Error tracking visitor:', error);
        resolve(false);
      }
    }, 100); // 100ms debounce
  });
};

export const fetchVisitorStats = () =>
  axiosInstance.get('/visitors/stats'); 