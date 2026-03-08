/**
 * Expense and transaction related types
 */

export type ExpenseCategory = 
  | 'food' 
  | 'transport' 
  | 'entertainment' 
  | 'utilities' 
  | 'shopping' 
  | 'health' 
  | 'education' 
  | 'other';

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface Income {
  id: string;
  userId: string;
  amount: number;
  source: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction extends Expense {}

export interface CreateExpenseRequest {
  amount: number;
  category: ExpenseCategory;
  description: string;
  timestamp: string;
}

export interface UpdateExpenseRequest {
  amount?: number;
  category?: ExpenseCategory;
  description?: string;
}

export interface CreateIncomeRequest {
  amount: number;
  source: string;
  date: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  averageDailySpend: number;
  daysRemaining: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
}

export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}