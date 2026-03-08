import { create } from 'zustand';
import { Expense, ExpenseStats } from '../types/expense';

interface ExpenseStore {
  expenses: Expense[];
  stats: ExpenseStats | null;
  isLoading: boolean;
  error: string | null;
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, data: Partial<Expense>) => void;
  setStats: (stats: ExpenseStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearExpenses: () => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  stats: null,
  isLoading: false,
  error: null,

  setExpenses: (expenses) => set({ expenses }),

  addExpense: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),

  removeExpense: (id) =>
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),

  updateExpense: (id, data) =>
    set((state) => ({
      expenses: state.expenses.map((e) => (e.id === id ? { ...e, ...data } : e)),
    })),

  setStats: (stats) => set({ stats }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearExpenses: () => set({ expenses: [], stats: null }),
}));
