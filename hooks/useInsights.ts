import { useCallback, useEffect, useState } from 'react';
import { Messages } from '../constants/messages';
import { insightsService } from '../services/insightsService';
import { MLInsights, SmartPurchaseDecision, SmartPurchaseRequest } from '../types/ml';

/**
 * Hook for ML insights operations
 */
export const useInsights = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<MLInsights | null>(null);

  // Load insights on mount
  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await insightsService.getInsights();
      setInsights(data);
    } catch (err: any) {
      const message = err?.message || Messages.errors.unknownError;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSmartPurchaseDecision = useCallback(
    async (request: SmartPurchaseRequest): Promise<SmartPurchaseDecision> => {
      try {
        setIsLoading(true);
        setError(null);

        const decision = await insightsService.getSmartPurchaseDecision(request);
        return decision;
      } catch (err: any) {
        const message = err?.message || Messages.errors.unknownError;
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getRecommendations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      return await insightsService.getRecommendations();
    } catch (err: any) {
      const message = err?.message || Messages.errors.unknownError;
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadInsights();
  }, [loadInsights]);

  return {
    insights,
    isLoading,
    error,
    getSmartPurchaseDecision,
    getRecommendations,
    refresh,
    clearError: () => setError(null),
  };
};