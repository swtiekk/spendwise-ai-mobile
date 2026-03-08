import { mockExpenses } from '@/data/mockData';
import { PaginatedResponse } from '../types/api';
import {
    CreateExpenseRequest,
    CreateIncomeRequest,
    Expense,
    ExpenseStats,
    Income,
} from '../types/expense';

// Local mutable copy for add/update/delete
let expenses: Expense[] = [...mockExpenses] as unknown as Expense[];

export const expenseService = {

  createExpense: async (data: CreateExpenseRequest): Promise<Expense> => {
    await new Promise((r) => setTimeout(r, 600));
    const newExpense: Expense = {
      id: `e${Date.now()}`,
      ...data,
    } as unknown as Expense;
    expenses = [newExpense, ...expenses];
    return newExpense;
  },

  getExpenses: async (page = 1, pageSize = 20): Promise<PaginatedResponse<Expense>> => {
    await new Promise((r) => setTimeout(r, 400));
    const start = (page - 1) * pageSize;
    const sliced = expenses.slice(start, start + pageSize);
    const totalPages = Math.ceil(expenses.length / pageSize);
    return {
      items:           sliced,               // ✅ renamed from `data` → `items` (matches PaginatedResponse)
      total:           expenses.length,
      page,
      pageSize,
      hasNextPage:     page < totalPages,    // ✅ added: required by PaginatedResponse
      hasPreviousPage: page > 1,             // ✅ added: required by PaginatedResponse
      // ❌ removed: totalPages — not on PaginatedResponse type
    };
  },

  getExpense: async (id: string): Promise<Expense> => {
    await new Promise((r) => setTimeout(r, 300));
    const found = expenses.find((e) => e.id === id);
    if (!found) throw new Error(`Expense ${id} not found`);
    return found;
  },

  updateExpense: async (id: string, data: Partial<CreateExpenseRequest>): Promise<Expense> => {
    await new Promise((r) => setTimeout(r, 500));
    expenses = expenses.map((e) => (e.id === id ? { ...e, ...data } : e));
    return expenses.find((e) => e.id === id)!;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 400));
    expenses = expenses.filter((e) => e.id !== id);
  },

  recordIncome: async (data: CreateIncomeRequest): Promise<Income> => {
    await new Promise((r) => setTimeout(r, 500));
    return { id: `i${Date.now()}`, ...data } as unknown as Income;
  },

  getExpenseStats: async (): Promise<ExpenseStats> => {
    await new Promise((r) => setTimeout(r, 400));
    const total = expenses.reduce((sum, e) => sum + (e as any).amount, 0);
    return {
      totalExpenses:     total,              // ✅ renamed from totalSpent → totalExpenses (matches ExpenseStats)
      totalIncome:       18000,
      balance:           18000 - total,
      averageDailySpend: total / 30,         // ✅ added: required by ExpenseStats
      daysRemaining:     14,                 // ✅ added: required by ExpenseStats
      categoryBreakdown: {} as any,          // ✅ added: required by ExpenseStats
      // ❌ removed: expenseCount — not on ExpenseStats type
    };
  },

  getExpensesByDateRange: async (startDate: string, endDate: string): Promise<Expense[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return expenses.filter((e) => {
      const d = (e as any).date;
      return d >= startDate && d <= endDate;
    });
  },
};