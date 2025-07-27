import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUnresolvedChatCount } from '../api/chat';

interface NotificationContextType {
  unresolvedChatCount: number;
  loadingChatCount: boolean;
  refreshNotificationCount: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [unresolvedChatCount, setUnresolvedChatCount] = useState(0);
  const [loadingChatCount, setLoadingChatCount] = useState(true);

  const fetchUnresolvedChatCount = async () => {
    try {
      setLoadingChatCount(true);
      const response = await getUnresolvedChatCount();
      if (response.success || response.statusCode === 200) {
        const count = response.payload?.count || response.data?.count || 0;
        setUnresolvedChatCount(count);
        console.log('📊 [NotificationProvider] Unresolved chat count updated:', count);
      } else {
        console.error('❌ [NotificationProvider] Failed to fetch unresolved chat count:', response);
        setUnresolvedChatCount(0);
      }
    } catch (error) {
      console.error('💥 [NotificationProvider] Error fetching unresolved chat count:', error);
      setUnresolvedChatCount(0);
    } finally {
      setLoadingChatCount(false);
    }
  };

  useEffect(() => {
    fetchUnresolvedChatCount();
    
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnresolvedChatCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const contextValue: NotificationContextType = {
    unresolvedChatCount,
    loadingChatCount,
    refreshNotificationCount: fetchUnresolvedChatCount
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}; 