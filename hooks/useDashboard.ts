import { useCallback, useEffect, useState } from 'react';
import { Messages } from '../constants/messages';
import { authService } from '../services/authService';
import { expenseService } from '../services/expenseService';
import { ExpenseStats } from '../types/expense';

interface CategoryItem {
  category: string;
  amount: number;
  percentage: number;
  icon: string;  // ✅ ADDED
}

interface DashboardData {
  balance: number;
  daysRemaining: number;
  riskLevel: 'safe' | 'caution' | 'danger';
  totalSpent: number;
  categories: CategoryItem[];
  incomeAmount: number;
  incomeType: string;
  incomeCycle: string;
  nextIncomeDate: string;
}

/**
 * Hook for dashboard data
 */
export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [stats, user] = await Promise.all([
        expenseService.getExpenseStats(),
        authService.getCurrentUser()
      ]);
      
      // Calculate days remaining based on next pay date
      let daysRemaining = 0;
      if (user?.nextIncomeDate) {
        const nextPay = new Date(user.nextIncomeDate);
        const today = new Date();
        const diff = nextPay.getTime() - today.getTime();
        daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      } else {
        daysRemaining = stats.daysRemaining; // Fallback
      }

      // Transform stats to dashboard format
      const dashboardData: DashboardData = {
        balance: stats.balance,
        daysRemaining,
        riskLevel: calculateRiskLevel(stats.balance, user?.incomeAmount || 0),
        totalSpent: stats.totalExpenses,
        categories: Object.entries(stats.categoryBreakdown).map(([category, amount]) => ({
          category: getCategoryLabel(category),
          amount: amount as number,
          percentage: stats.totalExpenses > 0 ? Math.round(((amount as number) / stats.totalExpenses) * 100) : 0,
          icon: getCategoryIcon(category),
        })),
        incomeAmount: user?.incomeAmount || 0,
        incomeType: user?.incomeType || 'other',
        incomeCycle: user?.incomeCycle || 'monthly',
        nextIncomeDate: user?.nextIncomeDate || '',
      };

      setData(dashboardData);
    } catch (err: any) {
      const message = err?.message || Messages.errors.unknownError;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

// ============================================================================
// Helper Functions
// ============================================================================

function calculateRiskLevel(balance: number, income: number): 'safe' | 'caution' | 'danger' {
  if (income === 0) return balance > 0 ? 'caution' : 'danger';
  const ratio = balance / income;
  if (ratio > 0.4) return 'safe';
  if (ratio > 0.1) return 'caution';
  return 'danger';
}

/**
 * Get friendly label for category
 */
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    food: 'Food & Dining',
    transport: 'Transport',
    entertainment: 'Entertainment',
    utilities: 'Utilities',
    shopping: 'Shopping',
    health: 'Health',
    education: 'Education',
    other: 'Other',
  };
  return labels[category] || category;
}

/**
 * Get icon name for category
 */
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    food: 'utensils',
    transport: 'car',
    entertainment: 'film',
    utilities: 'zap',
    shopping: 'shopping-bag',
    health: 'heart',
    education: 'book',
    other: 'more-horizontal',
  };
  return icons[category] || 'more-horizontal';
}