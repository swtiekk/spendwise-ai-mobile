import {
  MLInsights,
  SmartPurchaseDecision,
  SmartPurchaseRequest,
} from '../types/ml';
import api from './api';

export const insightsService = {
  /**
   * Fetch ML insights from FastAPI backend and map all supported fields.
   */
  getInsights: async (): Promise<MLInsights> => {
    const res = await api.get('/insights');
    const d = res.data;

    return {
      // Core fields
      userId: String(d.userId ?? d.user_id ?? ''),
      userCluster:
        d.userCluster ??
        d.user_cluster ??
        'Balanced Spender',
      clusterDescription:
        d.clusterDescription ??
        d.cluster_description ??
        '',
      dailyBurnRate:
        d.dailyBurnRate ??
        d.daily_burn_rate ??
        0,
      daysRemaining:
        d.daysRemaining ??
        d.days_remaining ??
        0,
      riskLevel:
        d.riskLevel ??
        d.risk_level ??
        'low',

      // Prediction data
      predictions: Array.isArray(d.predictions)
        ? d.predictions
        : [],

      // Recommendations
      recommendations: Array.isArray(d.recommendations)
        ? d.recommendations.map((r: any, index: number) =>
            typeof r === 'string'
              ? {
                  id: String(index + 1),
                  title: r,
                  description: r,
                  priority: 'medium',
                  createdAt: '',
                }
              : {
                  id: String(r.id ?? index + 1),
                  title: r.title ?? r.description ?? 'Recommendation',
                  description:
                    r.description ??
                    r.title ??
                    '',
                  priority: r.priority ?? 'medium',
                  createdAt:
                    r.createdAt ??
                    r.created_at ??
                    '',
                }
          )
        : [],

      // Last updated timestamp
      lastUpdated:
        d.lastUpdated ??
        d.last_updated ??
        '',

      // Additional fields used by Insights screen
      weeklyTrend:
        d.weeklyTrend ??
        d.weekly_trend ??
        [],

      clusterPercentage:
        d.clusterPercentage ??
        d.cluster_percentage ??
        38,

      clusterColor:
        d.clusterColor ??
        d.cluster_color ??
        '#6366F1',

      incomeCycle:
        d.incomeCycle ??
        d.income_cycle ??
        'monthly',

      nextIncomeDate:
        d.nextIncomeDate ??
        d.next_income_date ??
        null,

      prediction:
        d.prediction ??
        '',
    } as MLInsights;
  },

  /**
   * Get smart purchase decision from ML model.
   */
  getSmartPurchaseDecision: async (
    request: SmartPurchaseRequest
  ): Promise<SmartPurchaseDecision> => {
    const res = await api.post('/smart-purchase', {
      amount: request.amount,
      category: request.category,
      description: request.description ?? '',
    });

    const d = res.data;

    return {
      decision: d.decision,
      riskScore: d.risk_score ?? d.riskScore ?? 0,
      reasoning: d.reasoning ?? '',
      suggestions: d.suggestions ?? [],
      currentBalance:
        d.current_balance ??
        d.currentBalance ??
        0,
      remainingBudget:
        d.remaining_budget ??
        d.remainingBudget ??
        0,
      estimatedDaysUntilShortfall:
        d.estimated_days_until_shortfall ??
        d.estimatedDaysUntilShortfall ??
        null,
    };
  },

  /**
   * Get recommendations only.
   */
  getRecommendations: async (): Promise<string[]> => {
    const res = await api.get('/insights');
    const recommendations = res.data.recommendations ?? [];

    if (!Array.isArray(recommendations)) {
      return [];
    }

    return recommendations.map((r: any) =>
      typeof r === 'string'
        ? r
        : r.title ?? r.description ?? 'Recommendation'
    );
  },

  /**
   * Get user spending cluster.
   */
  getUserCluster: async (): Promise<string> => {
    const res = await api.get('/insights');
    return (
      res.data.userCluster ??
      res.data.user_cluster ??
      'Balanced Spender'
    );
  },

  /**
   * Get weekly predictions/trends.
   */
  getPredictions: async (): Promise<any[]> => {
    const res = await api.get('/insights');

    return (
      res.data.predictions ??
      res.data.weeklyTrend ??
      res.data.weekly_trend ??
      []
    );
  },
};