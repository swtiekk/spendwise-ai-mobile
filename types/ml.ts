/**
 * Machine Learning and AI related types
 */

export type UserCluster = 'Frugal' | 'Balanced' | 'Impulsive' | 'High-Risk';
export type RiskLevel = 'safe' | 'caution' | 'danger';

export interface MLInsights {
  userId: string;
  userCluster: UserCluster;
  clusterDescription: string;
  dailyBurnRate: number;
  daysRemaining: number;
  riskLevel: RiskLevel;
  predictions: Prediction[];
  recommendations: Recommendation[];
  lastUpdated: string;
}

export interface Prediction {
  id: string;
  type: 'spending' | 'sustainability' | 'budget-overage';
  title: string;
  description: string;
  value: number;
  confidence: number; // 0-100
  timestamp: string;
  actionable: boolean;
}

export interface Recommendation {
  id: string;
  type: 'spending-control' | 'savings' | 'budget-adjustment' | 'goal-setting';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionLabel?: string;
  actionUrl?: string;
  createdAt: string;
}

export interface SmartPurchaseRequest {
  amount: number;
  category: string;
  description?: string;
}

export interface SmartPurchaseDecision {
  decision: 'safe' | 'caution' | 'risky';
  riskScore: number; // 0-100
  reasoning: string;
  estimatedDaysUntilShortfall?: number;
  suggestions?: string[];
  currentBalance: number;
  remainingBudget: number;
}

export interface BehaviorAnalysis {
  userId: string;
  cluster: UserCluster;
  spendingPatterns: SpendingPattern[];
  categoryTrends: CategoryTrend[];
  insights: string[];
}

export interface SpendingPattern {
  pattern: string;
  frequency: string;
  impact: string;
}

export interface CategoryTrend {
  category: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  percentageChange: number;
  suggestion?: string;
}

export interface ClusterComparison {
  userCluster: UserCluster;
  averageSpending: number;
  userSpending: number;
  percentilRank: number; // 0-100
  recommendation: string;
}