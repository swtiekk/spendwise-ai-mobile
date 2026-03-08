import { create } from 'zustand';
import { MLInsights, SmartPurchaseDecision } from '../types/ml';

interface InsightsStore {
  insights: MLInsights | null;
  lastPurchaseDecision: SmartPurchaseDecision | null;
  isLoading: boolean;
  error: string | null;
  setInsights: (insights: MLInsights) => void;
  setPurchaseDecision: (decision: SmartPurchaseDecision) => void;
  clearPurchaseDecision: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useInsightsStore = create<InsightsStore>((set) => ({
  insights: null,
  lastPurchaseDecision: null,
  isLoading: false,
  error: null,

  setInsights: (insights) => set({ insights }),

  setPurchaseDecision: (decision) => set({ lastPurchaseDecision: decision }),

  clearPurchaseDecision: () => set({ lastPurchaseDecision: null }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));
