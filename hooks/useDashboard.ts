import { useCallback, useEffect, useState } from 'react';
import { Messages } from '../constants/messages';
import api from '../services/api';
import { useUserStore } from '../store/useUserStore';
import { onProfileUpdated } from './useUser';

interface CategoryItem {
  category:   string;
  amount:     number;
  percentage: number;
  icon:       string;
}

interface DashboardData {
  balance:        number;
  daysRemaining:  number;
  riskLevel:      'safe' | 'caution' | 'danger';
  totalSpent:     number;
  totalIncome:    number;
  savingsGoal:    number;
  categories:     CategoryItem[];
  nextIncomeDate: string;
  incomeType:     string;
  incomeCycle:    string;
  incomeAmount:   number;
}

const CATEGORY_ICONS: Record<string, string> = {
  food:          'utensils',
  transport:     'car',
  entertainment: 'film',
  utilities:     'zap',
  shopping:      'shopping-bag',
  health:        'heart',
  education:     'book',
  savings:       'piggy-bank',
  other:         'more-horizontal',
};

const CATEGORY_LABELS: Record<string, string> = {
  food:          'Food & Dining',
  transport:     'Transport',
  entertainment: 'Entertainment',
  utilities:     'Utilities',
  shopping:      'Shopping',
  health:        'Health',
  education:     'Education',
  savings:       'Savings',
  other:         'Other',
};

export const useDashboard = () => {
  const [data,      setData]      = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error,     setError]     = useState<string | null>(null);

  const profile = useUserStore((s) => s.profile);

  // ── Load on mount ─────────────────────────────────────
  useEffect(() => {
    loadDashboard();
  }, []);

  // ── Main load function ────────────────────────────────
  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const statsRes = await api.get('/expenses/stats');
      const stats    = statsRes.data;

      // Days remaining from next_income_date or cycle fallback
      const today = new Date();
      let daysRemaining = stats.days_remaining ?? 0;

      // If profile has next_income_date, use it directly
      if (profile?.nextIncomeDate) {
        const nextDate = new Date(profile.nextIncomeDate);
        daysRemaining  = Math.max(0, Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
      }

      const income        = stats.total_income || profile?.incomeAmount || 0;
      const totalExpenses = stats.total_expenses || 0;
      const spendingRatio = income > 0 ? totalExpenses / income : 0;

      const riskLevel: 'safe' | 'caution' | 'danger' =
        spendingRatio < 0.5 ? 'safe' :
        spendingRatio < 0.8 ? 'caution' : 'danger';

      const breakdown  = stats.category_breakdown || {};
      const categories: CategoryItem[] = Object.entries(breakdown)
        .map(([key, amount]) => ({
          category:   CATEGORY_LABELS[key] || key,
          amount:     amount as number,
          percentage: totalExpenses > 0 ? Math.round(((amount as number) / totalExpenses) * 100) : 0,
          icon:       CATEGORY_ICONS[key] || 'more-horizontal',
        }))
        .sort((a, b) => b.amount - a.amount);

      const nextIncomeDate = profile?.nextIncomeDate
        ? new Date(profile.nextIncomeDate).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      setData({
        balance:        stats.balance        ?? 0,
        totalSpent:     totalExpenses,
        totalIncome:    income,
        savingsGoal:    stats.savings_goal   ?? profile?.savingsGoal ?? 0,
        daysRemaining:  daysRemaining,
        riskLevel:      riskLevel,
        categories:     categories,
        nextIncomeDate: nextIncomeDate,
        incomeType:     profile?.incomeType  ?? 'salary',
        incomeCycle:    profile?.incomeCycle ?? 'monthly',
        incomeAmount:   income,
      });
    } catch (err: any) {
      setError(err?.message || Messages.errors.unknownError);
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  // ── Refresh when profile updates (after edit-profile save) ──
  useEffect(() => {
    const unsubscribe = onProfileUpdated(() => {
      loadDashboard();
    });
    return () => { unsubscribe(); };
  }, [loadDashboard]);

  const refresh = useCallback(async () => {
    await loadDashboard();
  }, [loadDashboard]);

  return {
    data,
    isLoading,
    error,
    refresh,
    clearError: () => setError(null),
  };
};