import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import { UserProfile } from '../types/user';

// ── Simple global event emitter for cross-hook communication ──────────────────
type Listener = () => void;
const profileUpdateListeners: Set<Listener> = new Set();

export const onProfileUpdated = (fn: Listener) => {
  profileUpdateListeners.add(fn);
  return () => profileUpdateListeners.delete(fn);
};

const emitProfileUpdated = () => {
  profileUpdateListeners.forEach(fn => fn());
};

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useUser = () => {
  const authUser = useAuthStore((s) => s.user);

  const {
    profile,
    savingsGoals,
    setProfile,
    setSavingsGoals,
    updateProfile,
  } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get('/profile');

      const fetchedProfile: UserProfile = {
        id: authUser?.id ?? '',
        email: res.data.email ?? (authUser as any)?.email ?? '',
        name: res.data.first_name ?? authUser?.name ?? '',
        phone: res.data.phone ?? '',                    // ← Added support
        incomeType: res.data.income_type ?? 'salary',
        incomeCycle: res.data.income_cycle ?? 'monthly',
        incomeAmount: res.data.income_amount ?? 0,
        nextIncomeDate: res.data.next_income_date ?? '',
        savingsGoal: res.data.savings_goal ?? 0,
        preferences: {
          notificationsEnabled: true,
          darkMode: false,
          currency: 'PHP',
          language: 'en',
          budgetAlertThreshold: 80,
        },
        createdAt: '',
        updatedAt: '',
      };

      setProfile(fetchedProfile);
      setSavingsGoals([]);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [authUser, setProfile, setSavingsGoals]);

  useEffect(() => {
    if (authUser) loadProfile();
  }, [authUser, loadProfile]);

  const editProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      try {
        setIsLoading(true);
        setError(null);

        await api.patch('/profile', {
          ...(data.name !== undefined && { first_name: data.name }),
          ...(data.email !== undefined && { email: data.email }),           // ← Added
          ...(data.phone !== undefined && { phone: data.phone }),           // ← Added
          ...(data.incomeAmount !== undefined && { income_amount: data.incomeAmount }),
          ...(data.incomeType !== undefined && { income_type: data.incomeType }),
          ...(data.incomeCycle !== undefined && { income_cycle: data.incomeCycle }),
          ...(data.nextIncomeDate !== undefined && { next_income_date: data.nextIncomeDate }),
          ...(data.savingsGoal !== undefined && { savings_goal: data.savingsGoal }),
        });

        // Update local store
        updateProfile(data);

        // Reload latest profile from backend
        await loadProfile();

        // Notify other hooks (Dashboard, Insights, etc.)
        emitProfileUpdated();
      } catch (err: any) {
        setError(err?.message ?? 'Failed to update profile');
      } finally {
        setIsLoading(false);
      }
    },
    [updateProfile, loadProfile]
  );

  return {
    profile,
    savingsGoals,
    isLoading,
    error,
    loadProfile,
    editProfile,
    clearError: () => setError(null),
  };
};