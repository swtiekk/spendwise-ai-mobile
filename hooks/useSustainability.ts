import { useCallback, useEffect, useState } from 'react';
import { Messages } from '../constants/messages';
import { expenseService } from '../services/expenseService';
import { ExpenseStats } from '../types/expense';

export interface SustainabilityData {
  daysRemaining: number;
  riskLevel: 'safe' | 'caution' | 'danger';
  balance: number;
  averageDailySpend: number;
  burnoutDate: string | null;
  budgetPercentageUsed: number;
  isAtRisk: boolean;
  warning: string | null;
}

const SAFE_THRESHOLD = 0.4; // 40% of income remaining
const CAUTION_THRESHOLD = 0.15; // 15% of income remaining

/**
 * Hook for calculating sustainability metrics
 * Shows days remaining until next income and financial health
 */
export const useSustainability = () => {
  const [data, setData] = useState<SustainabilityData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    calculateSustainability();
  }, []);

  const calculateSustainability = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stats: ExpenseStats = await expenseService.getExpenseStats();

      // Calculate metrics
      const daysRemaining = calculateDaysRemaining(
        stats.balance,
        stats.averageDailySpend
      );

      const riskLevel = calculateRiskLevel(
        stats.balance,
        stats.totalIncome
      );

      const budgetPercentageUsed = Math.round(
        (stats.totalExpenses / stats.totalIncome) * 100
      );

      const burnoutDate = calculateBurnoutDate(
        stats.balance,
        stats.averageDailySpend
      );

      const isAtRisk = riskLevel === 'danger' || daysRemaining < 5;

      const warning = generateWarning(
        riskLevel,
        daysRemaining,
        budgetPercentageUsed
      );

      const sustainabilityData: SustainabilityData = {
        daysRemaining,
        riskLevel,
        balance: stats.balance,
        averageDailySpend: stats.averageDailySpend,
        burnoutDate,
        budgetPercentageUsed,
        isAtRisk,
        warning,
      };

      setData(sustainabilityData);
    } catch (err: any) {
      const message = err?.message || Messages.errors.unknownError;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await calculateSustainability();
  }, [calculateSustainability]);

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

/**
 * Calculate days remaining until money runs out
 */
function calculateDaysRemaining(
  balance: number,
  dailyBurnRate: number
): number {
  if (dailyBurnRate === 0 || balance < 0) return 0;
  return Math.max(0, Math.floor(balance / dailyBurnRate));
}

/**
 * Calculate risk level based on balance and income
 */
function calculateRiskLevel(
  balance: number,
  totalIncome: number
): 'safe' | 'caution' | 'danger' {
  const percentageRemaining = totalIncome > 0 ? balance / totalIncome : 0;

  if (percentageRemaining >= SAFE_THRESHOLD) {
    return 'safe';
  } else if (percentageRemaining >= CAUTION_THRESHOLD) {
    return 'caution';
  } else {
    return 'danger';
  }
}

/**
 * Calculate the date when money will run out
 */
function calculateBurnoutDate(
  balance: number,
  dailyBurnRate: number
): string | null {
  if (dailyBurnRate === 0 || balance <= 0) return null;

  const daysRemaining = Math.floor(balance / dailyBurnRate);
  const burnoutDate = new Date();
  burnoutDate.setDate(burnoutDate.getDate() + daysRemaining);

  return burnoutDate.toISOString();
}

/**
 * Generate warning message based on sustainability
 */
function generateWarning(
  riskLevel: 'safe' | 'caution' | 'danger',
  daysRemaining: number,
  budgetPercentageUsed: number
): string | null {
  if (riskLevel === 'danger') {
    if (daysRemaining < 5) {
      return `Critical: Only ${daysRemaining} days of budget remaining!`;
    }
    return 'Warning: You are spending too much. Reduce expenses immediately.';
  }

  if (riskLevel === 'caution') {
    if (budgetPercentageUsed > 80) {
      return `Caution: You have used ${budgetPercentageUsed}% of your income.`;
    }
    return `${daysRemaining} days remaining. Monitor spending carefully.`;
  }

  if (budgetPercentageUsed > 90) {
    return `You have used ${budgetPercentageUsed}% of your income. Consider reducing spending.`;
  }

  return null;
}