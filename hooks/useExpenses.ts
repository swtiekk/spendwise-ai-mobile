import { useCallback, useEffect, useState } from 'react';
import { Messages } from '../constants/messages';
import { expenseService } from '../services/expenseService';
import { CreateExpenseRequest, Expense } from '../types/expense';

/**
 * Hook for expense operations
 */
export const useExpenses = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses on mount
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await expenseService.getExpenses();
      setExpenses(response.items);
    } catch (err: any) {
      const message = err?.message || Messages.errors.unknownError;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createExpense = useCallback(
    async (data: CreateExpenseRequest) => {
      try {
        setIsLoading(true);
        setError(null);

        const newExpense = await expenseService.createExpense(data);
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

        return newExpense;
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

  const deleteExpenseItem = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);

        await expenseService.deleteExpense(id);
        setExpenses((prevExpenses) => prevExpenses.filter(e => e.id !== id));
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

  const refresh = useCallback(async () => {
    await loadExpenses();
  }, [loadExpenses]);

  return {
    expenses,
    isLoading,
    error,
    createExpense,
    deleteExpense: deleteExpenseItem,
    refresh,
    clearError: () => setError(null),
  };
};