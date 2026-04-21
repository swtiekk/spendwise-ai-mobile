import { SmartPurchaseDecision, SmartPurchaseRequest } from '../types/ml';
import api from './api';

export const smartPurchaseService = {

  checkPurchase: async (request: SmartPurchaseRequest): Promise<SmartPurchaseDecision> => {
    const res = await api.post('/smart-purchase', {
      amount:      request.amount,
      category:    request.category    ?? 'other',
      description: request.description ?? '',
    });
    return {
      decision:                    res.data.decision,
      riskScore:                   res.data.risk_score,
      reasoning:                   res.data.reasoning,
      suggestions:                 res.data.suggestions          ?? [],
      currentBalance:              res.data.current_balance,
      remainingBudget:             res.data.remaining_budget,
      estimatedDaysUntilShortfall: res.data.estimated_days_until_shortfall ?? null,
    };
  },
};