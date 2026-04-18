import { useCallback, useEffect, useState } from 'react';
import { Messages } from '../constants/messages';
import { expenseService } from '../services/expenseService';
import { CreateExpenseRequest, Expense } from '../types/expense';

export const useExpenses = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error,     setError]     = useState<string | null>(null);
  const [expenses,  setExpenses]  = useState<Expense[]>([]);

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

  const createExpense = useCallback(async (data: CreateExpenseRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const newExpense = await expenseService.createExpense(data);
      setExpenses(prev => [newExpense, ...prev]);
      return newExpense;
    } catch (err: any) {
      const message = err?.message || Messages.errors.unknownError;
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteExpenseItem = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('[useExpenses] deleteExpense id:', id);
      await expenseService.deleteExpense(id);
      console.log('[useExpenses] deleteExpense success — updating state');
      setExpenses(prev => prev.filter(e => String(e.id) !== String(id)));
    } catch (err: any) {
      console.error('[useExpenses] deleteExpense error:', err?.message);
      const message = err?.message ?? Messages.errors.unknownError;
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

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