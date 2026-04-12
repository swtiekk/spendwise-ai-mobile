import { MLInsights, SmartPurchaseDecision, SmartPurchaseRequest } from '../types/ml';
import api from './api';

export const insightsService = {

  getInsights: async (): Promise<MLInsights> => {
    const res = await api.get('/insights/');
    return {
      userId:             '',
      userCluster:        res.data.user_cluster,
      clusterDescription: res.data.cluster_description,
      dailyBurnRate:      res.data.daily_burn_rate,
      daysRemaining:      res.data.days_remaining,
      riskLevel:          res.data.risk_level,
      predictions:        [],
      recommendations:    res.data.recommendations.map((r: string, i: number) => ({
        id:          String(i),
        type:        'spending-control',
        title:       r,
        description: r,
        priority:    'medium',
        createdAt:   '',
      })),
      lastUpdated: res.data.last_updated,
    };
  },

  getSmartPurchaseDecision: async (request: SmartPurchaseRequest): Promise<SmartPurchaseDecision> => {
    const res = await api.post('/smart-purchase/', {
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
      estimatedDaysUntilShortfall: res.data.estimated_days_until_shortfall,
    };
  },

  getRecommendations: async (): Promise<string[]> => {
    const res = await api.get('/insights/');
    return res.data.recommendations ?? [];
  },

  getUserCluster: async (): Promise<string> => {
    const res = await api.get('/insights/');
    return res.data.user_cluster ?? 'Balanced';
  },

  getPredictions: async (): Promise<any[]> => {
    const res = await api.get('/insights/');
    return res.data.weekly_trend ?? [];
  },
};