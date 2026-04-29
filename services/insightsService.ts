import { ExpenseCategories } from '../constants/categories';
import { MLInsights, SmartPurchaseDecision, SmartPurchaseRequest, CategorySpending } from '../types/ml';
import { authService } from './authService';
import { expenseService } from './expenseService';

export const insightsService = {

  getInsights: async (): Promise<MLInsights> => {
    await new Promise((r) => setTimeout(r, 600));
    
    const expenses = expenseService._getRawExpenses();
    const user = await authService.getCurrentUser();
    const totalIncome = user?.incomeAmount || 0;
    
    // Calculate category breakdown
    const categoryTotals: Record<string, number> = {};
    let totalSpent = 0;
    
    expenses.forEach(exp => {
      const catLabel = exp.category;
      categoryTotals[catLabel] = (categoryTotals[catLabel] || 0) + exp.amount;
      totalSpent += exp.amount;
    });
    
    const breakdown: CategorySpending[] = Object.entries(categoryTotals).map(([label, value]) => {
      // Find matching category in constants to get color/icon
      const catEntry = Object.values(ExpenseCategories).find(c => c.label === label);
      
      return {
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        value,
        color: catEntry?.color || '#64748B',
        icon: catEntry?.icon || 'more-horizontal',
        percentage: totalSpent > 0 ? Math.round((value / totalSpent) * 100) : 0
      };
    });

    // Determine risk level based on income ratio
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (totalIncome > 0) {
      const ratio = totalSpent / totalIncome;
      if (ratio > 0.8) riskLevel = 'high';
      else if (ratio > 0.5) riskLevel = 'medium';
    } else if (totalSpent > 0) {
      riskLevel = 'high'; // Spending without income is high risk
    }

    const prediction = totalSpent === 0 
      ? "You haven't recorded any expenses yet. Start tracking to see your spending health analysis!"
      : riskLevel === 'low' 
      ? "Your spending is healthy and well within your income. You're on track to meet your savings goals."
      : riskLevel === 'medium'
      ? "Your spending is moderate. Be cautious with discretionary expenses to maintain your buffer."
      : "Your spending has reached a critical level relative to your income. Consider postponing non-essential purchases.";

    // Calculate days remaining until next income
    let daysRemaining = 14; // Default fallback
    if (user?.nextIncomeDate) {
      const nextPay = new Date(user.nextIncomeDate);
      const today = new Date();
      const diff = nextPay.getTime() - today.getTime();
      daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    } else if (user?.incomeCycle) {
      // Fallback based on cycle if date is missing
      daysRemaining = user.incomeCycle === 'monthly' ? 15 : user.incomeCycle === 'biweekly' ? 7 : 3;
    }

    // Determine user cluster based on risk level
    const userCluster = riskLevel === 'high' ? 'High-Risk Spender' : riskLevel === 'medium' ? 'Impulsive Spender' : 'Conservative Saver';
    const clusterDescription = riskLevel === 'high' 
      ? 'Your spending exceeds safe limits frequently.' 
      : riskLevel === 'medium' 
      ? 'You tend to spend on non-essentials occasionally.' 
      : 'You prioritize savings and essential spending.';

    return {
      userId: user?.id || 'anonymous',
      userCluster,
      clusterDescription,
      dailyBurnRate: totalSpent / 30,
      daysRemaining,
      riskLevel,
      prediction,
      predictions: [],
      recommendations: [],
      weeklyTrend: [],
      categoryBreakdown: breakdown,
      lastUpdated: new Date().toISOString(),
    };
  },

  getSmartPurchaseDecision: async (request: SmartPurchaseRequest): Promise<SmartPurchaseDecision> => {
    await new Promise((r) => setTimeout(r, 800));

    const user = await authService.getCurrentUser();
    const stats = await expenseService.getExpenseStats();
    const currentBalance = stats.balance;

    // Risk thresholds based on percentage of available balance
    const impact = (request.amount / Math.max(1, currentBalance)) * 100;
    
    let decision: SmartPurchaseDecision['decision'] = 'safe';
    if (impact > 20) decision = 'risky';
    else if (impact > 10) decision = 'caution';

    const riskScore = Math.min(100, Math.round(impact * 2));

    const reasoning =
      decision === 'safe'
        ? `₱${request.amount.toLocaleString('en-PH')} is a small fraction of your balance. This purchase won't significantly impact your financial health.`
        : decision === 'caution'
        ? `₱${request.amount.toLocaleString('en-PH')} will use about ${Math.round(impact)}% of your remaining balance. It's manageable but requires attention.`
        : `₱${request.amount.toLocaleString('en-PH')} represents ${Math.round(impact)}% of your current balance. This is a high-impact purchase that could lead to a shortfall.`;

    const suggestions: string[] =
      decision === 'safe'
        ? ['Safe to proceed.', 'Don\'t forget to log this expense.']
        : decision === 'caution'
        ? ['Consider if this is a need or a want.', 'Maybe wait a few days before deciding.']
        : ['Highly recommend deferring this purchase.', 'Look for a significantly cheaper alternative.', 'Review your essential expenses first.'];

    return {
      decision,
      riskScore,
      reasoning,
      suggestions,
      currentBalance:  currentBalance,
      remainingBudget: currentBalance - request.amount,
      estimatedDaysUntilShortfall: decision === 'risky' ? 3 : undefined,
    };
  },

  getRecommendations: async (): Promise<string[]> => {
    await new Promise((r) => setTimeout(r, 400));
    const insights = await insightsService.getInsights();
    return insights.recommendations?.map(r => r.title) || [];
  },

  getUserCluster: async (): Promise<string> => {
    await new Promise((r) => setTimeout(r, 400));
    const insights = await insightsService.getInsights();
    return insights.userCluster;
  },

  getPredictions: async (): Promise<any[]> => {
    await new Promise((r) => setTimeout(r, 500));
    const insights = await insightsService.getInsights();
    return insights.predictions;
  },
};