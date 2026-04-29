import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import { UserProfile } from '../types/user';

export const useUser = () => {
  const authUser = useAuthStore((s) => s.user);
  const { profile, savingsGoals, setProfile, setSavingsGoals, updateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  console.log('🟣 useUser hook - authUser:', authUser);

  useEffect(() => {
    console.log('🟠 useEffect fired, authUser:', authUser);
    if (authUser) loadProfile();
  }, [authUser]);

  const loadProfile = useCallback(async () => {
    console.log('🔵 loadProfile called, authUser:', authUser);
    try {
      setIsLoading(true);
      setError(null);

      console.log('🟡 calling GET /profile...');
      const res = await api.get('/profile');
      console.log('🟢 profile response:', res.data);

      const fetchedProfile: UserProfile = {
        id:             authUser?.id    ?? '',
        email:          authUser?.email ?? '',
        name:           authUser?.name  ?? '',
        incomeType:     res.data.income_type      ?? 'salary',
        incomeCycle:    res.data.income_cycle     ?? 'monthly',
        incomeAmount:   res.data.income_amount    ?? 0,
        nextIncomeDate: res.data.next_income_date ?? '',
        savingsGoal:    res.data.savings_goal     ?? 0,
        preferences: {
          notificationsEnabled: true,
          darkMode:             false,
          currency:             'PHP',
          language:             'en',
          budgetAlertThreshold: 80,
        },
        createdAt: '',
        updatedAt: '',
      };

      setProfile(fetchedProfile);
      setSavingsGoals([]);
    } catch (err: any) {
      console.log('🔴 profile error:', err?.response?.status, err?.message);
      setError(err?.message ?? 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [authUser, setProfile, setSavingsGoals]);

  const editProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      try {
        setIsLoading(true);
        setError(null);
        await api.patch('/profile', {
          ...(data.incomeAmount !== undefined && { income_amount: data.incomeAmount }),
          ...(data.incomeType   !== undefined && { income_type:   data.incomeType }),
          ...(data.incomeCycle  !== undefined && { income_cycle:  data.incomeCycle }),
        });
        updateProfile(data);
      } catch (err: any) {
        setError(err?.message ?? 'Failed to update profile');
      } finally {
        setIsLoading(false);
      }
    },
    [updateProfile]
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