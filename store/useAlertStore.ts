import { create } from 'zustand';

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface AlertStore {
  alerts: Alert[];
  unreadCount: number;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeAlert: (id: string) => void;
  clearAll: () => void;
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: [],
  unreadCount: 0,

  addAlert: (alertData) => {
    const newAlert: Alert = {
      ...alertData,
      id: `alert_${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    set((state) => ({
      alerts: [newAlert, ...state.alerts],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, read: true } : a)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      alerts: state.alerts.map((a) => ({ ...a, read: true })),
      unreadCount: 0,
    }));
  },

  removeAlert: (id) => {
    const alert = get().alerts.find((a) => a.id === id);
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
      unreadCount: alert && !alert.read
        ? Math.max(0, state.unreadCount - 1)
        : state.unreadCount,
    }));
  },

  clearAll: () => set({ alerts: [], unreadCount: 0 }),
}));
