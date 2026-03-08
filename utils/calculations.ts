// ── SpendWise AI — Calculation Utilities ─────────────────

/**
 * Calculate how many days until funds run out based on daily burn rate
 */
export const calcDaysRemaining = (balance: number, dailyBurnRate: number): number => {
  if (dailyBurnRate <= 0 || balance <= 0) return 0;
  return Math.floor(balance / dailyBurnRate);
};

/**
 * Calculate average daily spend from total over N days
 */
export const calcDailyAverage = (totalSpent: number, days = 30): number => {
  if (days <= 0) return 0;
  return totalSpent / days;
};

/**
 * Calculate percentage of budget used
 */
export const calcBudgetUsed = (spent: number, income: number): number => {
  if (income <= 0) return 0;
  return Math.min(100, Math.round((spent / income) * 100));
};

/**
 * Calculate savings progress as a percentage
 */
export const calcSavingsProgress = (current: number, target: number): number => {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
};

/**
 * Determine risk level from balance / income ratio
 */
export const calcRiskLevel = (
  balance: number,
  income: number
): 'safe' | 'caution' | 'danger' => {
  const ratio = income > 0 ? balance / income : 0;
  if (ratio >= 0.4) return 'safe';
  if (ratio >= 0.15) return 'caution';
  return 'danger';
};

/**
 * Calculate estimated burnout date
 */
export const calcBurnoutDate = (balance: number, dailyBurnRate: number): Date | null => {
  if (dailyBurnRate <= 0 || balance <= 0) return null;
  const days = Math.floor(balance / dailyBurnRate);
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * Calculate category breakdown percentages from amounts
 */
export const calcCategoryPercentages = (
  categories: { category: string; amount: number }[],
  total: number
): { category: string; amount: number; percentage: number }[] => {
  if (total <= 0) return categories.map(c => ({ ...c, percentage: 0 }));
  return categories.map(c => ({
    ...c,
    percentage: Math.round((c.amount / total) * 100),
  }));
};

/**
 * Smart purchase risk score (0–100, higher = riskier)
 */
export const calcPurchaseRisk = (purchaseAmount: number, balance: number): number => {
  if (balance <= 0) return 100;
  const ratio = purchaseAmount / balance;
  return Math.min(100, Math.round(ratio * 100));
};
