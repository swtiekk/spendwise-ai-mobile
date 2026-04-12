import { PaginatedResponse } from '../types/api';
import {
  CreateExpenseRequest,
  CreateIncomeRequest,
  Expense,
  ExpenseStats,
  Income,
} from '../types/expense';
import api from './api';

export const expenseService = {

  createExpense: async (data: CreateExpenseRequest): Promise<Expense> => {
    const res = await api.post('/expenses/', {
      amount:       data.amount,
      category_key: data.category,
      description:  data.description,
      timestamp:    data.timestamp,
    });
    return res.data;
  },

  getExpenses: async (page = 1, pageSize = 20): Promise<PaginatedResponse<Expense>> => {
    const res = await api.get(`/expenses/?page=${page}&page_size=${pageSize}`);
    const items = Array.isArray(res.data) ? res.data : res.data.results ?? [];
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
    const res = await api.get(`/expenses/${id}/`);
    return res.data;
  },

  updateExpense: async (id: string, data: Partial<CreateExpenseRequest>): Promise<Expense> => {
    const res = await api.patch(`/expenses/${id}/`, {
      ...(data.amount      && { amount:       data.amount }),
      ...(data.category    && { category_key: data.category }),
      ...(data.description && { description:  data.description }),
    });
    return res.data;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await api.delete(`/expenses/${id}/`);
  },

  recordIncome: async (data: CreateIncomeRequest): Promise<Income> => {
    const res = await api.post('/income/', data);
    return res.data;
  },

  getExpenseStats: async (): Promise<ExpenseStats> => {
    const res = await api.get('/expenses/stats/');
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
    const res = await api.get(`/expenses/?start_date=${startDate}&end_date=${endDate}`);
    return Array.isArray(res.data) ? res.data : res.data.results ?? [];
  },
};