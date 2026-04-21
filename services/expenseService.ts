import { PaginatedResponse } from '../types/api';
import {
  CreateExpenseRequest,
  CreateIncomeRequest,
  Expense,
  ExpenseStats,
  Income,
} from '../types/expense';
import api from './api';

function extractCategory(raw: any): string {
  const cat = raw.category_key ?? raw.category ?? raw.category_name ?? 'other';
  if (typeof cat === 'object' && cat !== null) {
    return String(cat.key ?? cat.name ?? cat.slug ?? cat.id ?? 'other').toLowerCase();
  }
  return String(cat).toLowerCase();
}

function mapExpense(raw: any): Expense {
  return {
    id:          String(raw.id ?? ''),
    userId:      String(raw.user ?? raw.user_id ?? raw.userId ?? ''),
    amount:      Number(raw.amount ?? 0),
    category:    extractCategory(raw) as any,
    description: String(raw.description ?? raw.title ?? ''),
    timestamp:   String(raw.timestamp   ?? raw.created_at ?? raw.createdAt ?? new Date().toISOString()),
    createdAt:   String(raw.created_at  ?? raw.createdAt  ?? ''),
    updatedAt:   String(raw.updated_at  ?? raw.updatedAt  ?? ''),
  };
}

export const expenseService = {

  createExpense: async (data: CreateExpenseRequest): Promise<Expense> => {
    const res = await api.post('/expenses', {
      amount:       data.amount,
      category_key: data.category,
      description:  data.description,
      timestamp:    data.timestamp,
    });
    return mapExpense(res.data);
  },

  getExpenses: async (page = 1, pageSize = 20): Promise<PaginatedResponse<Expense>> => {
    const res   = await api.get(`/expenses?page=${page}&page_size=${pageSize}`);
    const raw   = Array.isArray(res.data) ? res.data : (res.data.results ?? []);
    const items = raw.map(mapExpense);
    return {
      items,
      total:           items.length,
      page,
      pageSize,
      hasNextPage:     false,
      hasPreviousPage: page > 1,
    };
  },

  getExpense: async (id: string): Promise<Expense> => {
    const res = await api.get(`/expenses/${id}`);
    return mapExpense(res.data);
  },

  updateExpense: async (id: string, data: Partial<CreateExpenseRequest>): Promise<Expense> => {
    const res = await api.patch(`/expenses/${id}`, {
      ...(data.amount      !== undefined && { amount:       data.amount }),
      ...(data.category    !== undefined && { category_key: data.category }),
      ...(data.description !== undefined && { description:  data.description }),
    });
    return mapExpense(res.data);
  },

  deleteExpense: async (id: string): Promise<void> => {
    try {
      await api.delete(`/expenses/${id}`);
    } catch (err: any) {
      console.error('[expenseService] delete failed:', err?.message);
      throw err;
    }
  },

  recordIncome: async (data: CreateIncomeRequest): Promise<Income> => {
    const res = await api.post('/income', data);
    return res.data;
  },

  getExpenseStats: async (): Promise<ExpenseStats> => {
    const res = await api.get('/expenses/stats');
    return {
      totalExpenses:     res.data.total_expenses,
      totalIncome:       res.data.total_income,
      balance:           res.data.balance,
      averageDailySpend: res.data.average_daily_spend,
      daysRemaining:     res.data.days_remaining,
      categoryBreakdown: res.data.category_breakdown,
    };
  },

  getExpensesByDateRange: async (startDate: string, endDate: string): Promise<Expense[]> => {
    const res = await api.get(`/expenses?start_date=${startDate}&end_date=${endDate}`);
    const raw = Array.isArray(res.data) ? res.data : (res.data.results ?? []);
    return raw.map(mapExpense);
  },
};