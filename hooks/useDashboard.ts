import { useCallback, useEffect, useState } from 'react';
import { Messages } from '../constants/messages';
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

      const stats: ExpenseStats = await expenseService.getExpenseStats();
      
      // Transform stats to dashboard format
      const dashboardData: DashboardData = {
        balance: stats.balance,
        daysRemaining: calculateDaysRemaining(stats.balance, stats.averageDailySpend),
        riskLevel: calculateRiskLevel(stats.balance),
        totalSpent: stats.totalExpenses,
        categories: Object.entries(stats.categoryBreakdown).map(([category, amount]) => ({
          category: getCategoryLabel(category),
          amount: amount as number,
          percentage: Math.round(((amount as number) / stats.totalExpenses) * 100),
          icon: getCategoryIcon(category),  // ✅ ADDED
        })),
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

function calculateDaysRemaining(balance: number, dailyBurnRate: number): number {
  if (dailyBurnRate === 0) return Infinity;
  return Math.max(0, Math.floor(balance / dailyBurnRate));
}

function calculateRiskLevel(balance: number): 'safe' | 'caution' | 'danger' {
  if (balance > 5000) return 'safe';
  if (balance > 1000) return 'caution';
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