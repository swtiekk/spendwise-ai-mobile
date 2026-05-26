import { useCallback, useEffect } from 'react';
import { Messages } from '../constants/messages';
import { insightsService } from '../services/insightsService';
import { useInsightsStore } from '../store/useInsightsStore';

import {
  SmartPurchaseDecision,
  SmartPurchaseRequest,
} from '../types/ml';

// Import for profile update listener
import { onProfileUpdated } from './useUser';

/**
 * Hook for ML insights operations
 * Refactored to use global store
 */
export const useInsights = () => {
  const {
    insights,
    isLoading,
    error,
    setInsights,
    setLoading,
    setError,
    clearPurchaseDecision,
  } = useInsightsStore();

  const loadInsights = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await insightsService.getInsights();
      setInsights(data);
    } catch (err: any) {
      const message =
        err?.message || Messages.errors.unknownError;

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [setInsights, setLoading, setError]);

  // Always load insights when hook is first used
  useEffect(() => {
    loadInsights();
  }, [loadInsights]);

  // Refresh insights when user profile is updated (next income date, etc.)
  useEffect(() => {
    const unsubscribe = onProfileUpdated(() => {
      loadInsights();
    });

    return () => {
      unsubscribe();
    };
  }, []); // ← Fixed: Empty dependency array (safe & stable)

  const getSmartPurchaseDecision = useCallback(
    async (request: SmartPurchaseRequest): Promise<SmartPurchaseDecision> => {
      try {
        setLoading(true);
        setError(null);

        const decision = await insightsService.getSmartPurchaseDecision(request);
        return decision;
      } catch (err: any) {
        const message =
          err?.message || Messages.errors.unknownError;

        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const getRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      return await insightsService.getRecommendations();
    } catch (err: any) {
      const message =
        err?.message || Messages.errors.unknownError;

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

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
    clearPurchaseDecision,
  };
};