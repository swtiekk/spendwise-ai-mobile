import {
  MLInsights,
  SmartPurchaseDecision,
  SmartPurchaseRequest,
} from '../types/ml';
import api from './api';

export const insightsService = {
  /**
   * Fetch ML insights from FastAPI backend and map all supported fields.
   * Improved mapping to handle backend snake_case → frontend camelCase
   */
  getInsights: async (): Promise<MLInsights> => {
    const res = await api.get('/insights');
    const d = res.data || {};

    // Core ML fields from backend
    const userCluster = d.user_cluster ?? d.userCluster ?? 'Balanced Spender';
    const clusterDescription = d.cluster_description ?? d.clusterDescription ?? '';
    const riskLevel = d.risk_level ?? d.riskLevel ?? 'low';
    const prediction = d.prediction ?? d.sustainability ?? 'on_track';

    return {
      // Core fields from backend
      userId: String(d.user_id ?? d.userId ?? ''),
      userCluster,
      clusterDescription,
      dailyBurnRate: d.daily_burn_rate ?? d.dailyBurnRate ?? 0,
      daysRemaining: d.days_remaining ?? d.daysRemaining ?? 0,
      riskLevel,

      // Prediction & sustainability
      prediction,

      // Recommendations (backend doesn't return yet → fallback)
      recommendations: Array.isArray(d.recommendations)
        ? d.recommendations.map((r: any, index: number) => ({
            id: String(r.id ?? index + 1),
            title: typeof r === 'string' ? r : r.title ?? r.description ?? 'Recommendation',
            description: typeof r === 'string' ? r : r.description ?? '',
            priority: r.priority ?? 'medium',
            createdAt: r.created_at ?? r.createdAt ?? '',
          }))
        : [],

      // Last updated
      lastUpdated: d.last_updated ?? d.lastUpdated ?? '',

      // Fields not yet returned by backend - with smart fallbacks
      weeklyTrend: Array.isArray(d.weeklyTrend) || Array.isArray(d.weekly_trend)
        ? (d.weeklyTrend ?? d.weekly_trend)
        : [],

      clusterPercentage: d.cluster_percentage ?? d.clusterPercentage ?? 38,

      clusterColor: d.cluster_color ?? d.clusterColor ?? getClusterColor(userCluster),

      incomeCycle: d.income_cycle ?? d.incomeCycle ?? 'monthly',

      nextIncomeDate: d.next_income_date ?? d.nextIncomeDate ?? null,

      // Extra safety
      predictions: Array.isArray(d.predictions) ? d.predictions : [],
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

    const d = res.data || {};

    const recommendationMap: Record<string, 'safe' | 'caution' | 'risky'> = {
      recommended: 'safe',
      safe: 'safe',
      low: 'safe',
      green: 'safe',
      caution: 'caution',
      medium: 'caution',
      moderate: 'caution',
      warning: 'caution',
      yellow: 'caution',
      not_recommended: 'risky',
      risky: 'risky',
      high: 'risky',
      danger: 'risky',
      red: 'risky',
    };

    const rawDecision = (d.decision ?? d.recommendation ?? 'caution').toLowerCase();
    const decision = recommendationMap[rawDecision] ?? 'caution';

    const riskScoreMap: Record<string, number> = {
      safe: 20,
      caution: 55,
      risky: 90,
    };

    return {
      decision,
      riskScore: d.risk_score ?? d.riskScore ?? riskScoreMap[decision],
      reasoning: d.reason ?? d.reasoning ?? '',
      suggestions: Array.isArray(d.suggestions) ? d.suggestions : [],
      currentBalance: d.balance_before ?? d.current_balance ?? d.currentBalance ?? 0,
      remainingBudget: d.balance_after ?? d.remaining_budget ?? d.remainingBudget ?? 0,
      estimatedDaysUntilShortfall:
        d.estimated_days_until_shortfall ?? d.estimatedDaysUntilShortfall ?? null,
    };
  },

  /**
   * Get recommendations only.
   */
  getRecommendations: async (): Promise<string[]> => {
    try {
      const res = await api.get('/insights');
      const recs = res.data?.recommendations ?? [];
      return Array.isArray(recs)
        ? recs.map((r: any) => (typeof r === 'string' ? r : r.title ?? r.description ?? ''))
        : [];
    } catch {
      return [];
    }
  },

  /**
   * Get user spending cluster.
   */
  getUserCluster: async (): Promise<string> => {
    try {
      const res = await api.get('/insights');
      return res.data?.user_cluster ?? res.data?.userCluster ?? 'Balanced Spender';
    } catch {
      return 'Balanced Spender';
    }
  },

  /**
   * Get weekly predictions/trends.
   */
  getPredictions: async (): Promise<any[]> => {
    try {
      const res = await api.get('/insights');
      return res.data?.weekly_trend ?? res.data?.weeklyTrend ?? [];
    } catch {
      return [];
    }
  },
};

/** Helper to assign nice colors based on cluster - Improved matching */
function getClusterColor(cluster: string): string {
  const c = cluster.toLowerCase();
  if (c.includes('sav'))                      return '#2DD4BF';  // Savers / Saver
  if (c.includes('impuls'))                   return '#F59E0B';  // Impulsive
  if (c.includes('risk') || c.includes('danger') || c.includes('at-risk')) 
    return '#ef4444';  // At-Risk
  return '#6366F1';  // Default: Balanced
}