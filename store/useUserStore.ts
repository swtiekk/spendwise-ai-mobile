import { create } from 'zustand';
import { NotificationSettings, SavingsGoal, UserProfile } from '../types/user';

interface UserStore {
  profile: UserProfile | null;
  savingsGoals: SavingsGoal[];
  notifications: NotificationSettings | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  setSavingsGoals: (goals: SavingsGoal[]) => void;
  addSavingsGoal: (goal: SavingsGoal) => void;
  removeSavingsGoal: (id: string) => void;
  setNotifications: (settings: NotificationSettings) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  savingsGoals: [],
  notifications: null,
  isLoading: false,
  error: null,

  setProfile: (profile) => set({ profile }),

  updateProfile: (data) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : null,
    })),

  setSavingsGoals: (savingsGoals) => set({ savingsGoals }),

  addSavingsGoal: (goal) =>
    set((state) => ({ savingsGoals: [...state.savingsGoals, goal] })),

  removeSavingsGoal: (id) =>
    set((state) => ({
      savingsGoals: state.savingsGoals.filter((g) => g.id !== id),
    })),

  setNotifications: (notifications) => set({ notifications }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearUser: () =>
    set({ profile: null, savingsGoals: [], notifications: null }),
}));
