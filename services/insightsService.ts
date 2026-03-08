import { mockInsights } from '@/data/mockData';
import { MLInsights, SmartPurchaseDecision, SmartPurchaseRequest } from '../types/ml';

export const insightsService = {

  getInsights: async (): Promise<MLInsights> => {
    await new Promise((r) => setTimeout(r, 600));
    return mockInsights as unknown as MLInsights;
  },

  getSmartPurchaseDecision: async (request: SmartPurchaseRequest): Promise<SmartPurchaseDecision> => {
    await new Promise((r) => setTimeout(r, 800));

    // Risk thresholds: < ₱1500 = safe, ₱1500–₱3000 = caution, > ₱3000 = risky
    const decision: SmartPurchaseDecision['decision'] =
      request.amount < 1500 ? 'safe'    :
      request.amount < 3000 ? 'caution' : 'risky';

    const riskScore =
      decision === 'safe'    ? Math.round(request.amount / 1500 * 30)  :
      decision === 'caution' ? Math.round(30 + (request.amount - 1500) / 1500 * 40) :
                               Math.min(100, Math.round(70 + (request.amount - 3000) / 1000 * 10));

    const reasoning =
      decision === 'safe'
        ? `₱${request.amount.toLocaleString('en-PH')} is within your safe spending range. Your current balance can absorb this purchase without affecting your sustainability forecast.`
        : decision === 'caution'
        ? `₱${request.amount.toLocaleString('en-PH')} is manageable but will reduce your remaining budget significantly. Consider whether this is essential right now.`
        : `₱${request.amount.toLocaleString('en-PH')} exceeds safe spending limits based on your current balance and daily burn rate. This purchase risks shortfall before your next income.`;

    const suggestions: string[] =
      decision === 'safe'
        ? ['You can proceed with this purchase.', 'Consider logging it immediately after buying.']
        : decision === 'caution'
        ? ['Only proceed if this is a priority expense.', 'Look for a lower-cost alternative if possible.', 'Reduce spending in other categories this week.']
        : ['Defer this purchase until next pay cycle.', 'Check if you can borrow or find a cheaper substitute.', 'Review your spending breakdown to free up budget first.'];

    return {
      decision,
      riskScore,
      reasoning,
      suggestions,
      currentBalance:  20000, // replace with real balance from store
      remainingBudget: 20000 - request.amount,
      estimatedDaysUntilShortfall: decision === 'risky' ? 3 : undefined,
    };
  },

  getRecommendations: async (): Promise<string[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockInsights.recommendations;
  },

  getUserCluster: async (): Promise<string> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockInsights.spenderType;
  },

  getPredictions: async (): Promise<any[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockInsights.weeklyTrend;
  },
};