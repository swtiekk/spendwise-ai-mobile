import { MLInsights, SmartPurchaseDecision, SmartPurchaseRequest } from '../types/ml';
import api from './api';

export const insightsService = {

  getInsights: async (): Promise<MLInsights> => {
    const res = await api.get('/insights');
    const d   = res.data;
    return {
      userId:             '',
      userCluster:        d.user_cluster        ?? 'Balanced',
      clusterDescription: d.cluster_description ?? '',
      dailyBurnRate:      d.daily_burn_rate      ?? 0,
      daysRemaining:      d.days_remaining       ?? 0,
      riskLevel:          d.risk_level           ?? 'safe',
      predictions:        [],
      // FastAPI /insights does not return recommendations yet — safe empty fallback
      recommendations:    [],
      lastUpdated:        d.last_updated         ?? '',
    };
  },

  getSmartPurchaseDecision: async (request: SmartPurchaseRequest): Promise<SmartPurchaseDecision> => {
    const res = await api.post('/smart-purchase', {
      amount:      request.amount,
      category:    request.category,
      description: request.description ?? '',
    });
    return {
      decision:                    res.data.decision,
      riskScore:                   res.data.risk_score,
      reasoning:                   res.data.reasoning,
      suggestions:                 res.data.suggestions,
      currentBalance:              res.data.current_balance,
      remainingBudget:             res.data.remaining_budget,
      estimatedDaysUntilShortfall: res.data.estimated_days_until_shortfall ?? null,
    };
  },

  getRecommendations: async (): Promise<string[]> => {
    const res = await api.get('/insights');
    return res.data.recommendations ?? [];
  },

  getUserCluster: async (): Promise<string> => {
    const res = await api.get('/insights');
    return res.data.user_cluster ?? 'Balanced';
  },

  getPredictions: async (): Promise<any[]> => {
    const res = await api.get('/insights');
    return res.data.weekly_trend ?? [];
  },
};