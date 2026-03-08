import { useCallback, useState } from 'react';
import { Messages } from '../constants/messages';
import { insightsService } from '../services/insightsService';
import { SmartPurchaseDecision, SmartPurchaseRequest } from '../types/ml';

/**
 * Hook for smart purchase decision
 */
export const useSmartPurchase = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [decision, setDecision] = useState<SmartPurchaseDecision | null>(null);

  const checkPurchase = useCallback(
    async (request: SmartPurchaseRequest): Promise<SmartPurchaseDecision> => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await insightsService.getSmartPurchaseDecision(request);
        setDecision(result);

        return result;
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

  const reset = useCallback(() => {
    setDecision(null);
    setError(null);
  }, []);

  return {
    decision,
    isLoading,
    error,
    checkPurchase,
    reset,
    clearError: () => setError(null),
  };
};