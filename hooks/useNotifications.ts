import { useCallback, useState } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

/**
 * Hook for managing notifications and alerts
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Add a new notification
   */
  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Auto-remove after 5 seconds for non-persistent types
      if (notification.type === 'success' || notification.type === 'info') {
        setTimeout(() => {
          removeNotification(newNotification.id);
        }, 5000);
      }

      return newNotification;
    },
    []
  );

  /**
   * Remove a notification by ID
   */
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  /**
   * Clear all notifications
   */
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Get unread notification count
   */
  const unreadCount = notifications.filter((n) => !n.read).length;

  /**
   * Get notifications by type
   */
  const getByType = useCallback(
    (type: Notification['type']): Notification[] => {
      return notifications.filter((n) => n.type === type);
    },
    [notifications]
  );

  /**
   * Get active alerts (unread warnings/errors)
   */
  const activeAlerts = notifications.filter(
    (n) => !n.read && (n.type === 'warning' || n.type === 'error')
  );

  return {
    notifications,
    isLoading,
    error,
    addNotification,
    removeNotification,
    markAsRead,
    clearAll,
    unreadCount,
    getByType,
    activeAlerts,
  };
};