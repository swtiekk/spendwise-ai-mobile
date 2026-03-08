import { currentUser, mockSavingsGoals } from '@/data/mockData';
import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import { SavingsGoal, UserProfile } from '../types/user';

/**
 * Hook for user profile operations
 */
export const useUser = () => {
  const authUser = useAuthStore((s) => s.user);
  const { profile, savingsGoals, setProfile, setSavingsGoals, updateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    if (authUser && !profile) loadProfile();
  }, [authUser]);

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock: build profile from authUser + mockData
      const mockProfile: UserProfile = {
        id:             authUser?.id ?? 'u1',
        email:          authUser?.email ?? currentUser.email,
        name:           authUser?.name  ?? currentUser.name,
        incomeType:     authUser?.incomeType  ?? 'salary',
        incomeCycle:    authUser?.incomeCycle ?? 'monthly',
        incomeAmount:   authUser?.incomeAmount ?? currentUser.income,
        nextIncomeDate: authUser?.nextIncomeDate ?? '',
        savingsGoal:    currentUser.savingsGoal,
        preferences: {
          notificationsEnabled: true,
          darkMode:             false,
          currency:             'PHP',
          language:             'en',
          budgetAlertThreshold: 80,
        },
        createdAt: authUser?.createdAt ?? '',
        updatedAt: authUser?.updatedAt ?? '',
      };

      const goals: SavingsGoal[] = mockSavingsGoals.map((g) => ({
        id:            g.id,
        userId:        mockProfile.id,
        name:          g.title,
        targetAmount:  g.target,
        currentAmount: g.current,
        deadline:      '',
        createdAt:     '',
        updatedAt:     '',
      }));

      setProfile(mockProfile);
      setSavingsGoals(goals);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [authUser, setProfile, setSavingsGoals]);

  const editProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      try {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 500));
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
