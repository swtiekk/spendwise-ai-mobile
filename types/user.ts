/**
 * User profile and preferences related types
 */

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  incomeType: 'salary' | 'allowance' | 'freelance' | 'other';
  incomeCycle: 'weekly' | 'biweekly' | 'monthly';
  incomeAmount: number;
  nextIncomeDate: string;
  savingsGoal?: number;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  notificationsEnabled: boolean;
  darkMode: boolean;
  currency: string;
  language: string;
  budgetAlertThreshold: number; // percentage
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  budgetAlerts: boolean;
  weeklyReports: boolean;
  spendingReminders: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  incomeAmount?: number;
  nextIncomeDate?: string;
  preferences?: Partial<UserPreferences>;
}

export interface IncomeInfo {
  amount: number;
  type: 'salary' | 'allowance' | 'freelance' | 'other';
  cycle: 'weekly' | 'biweekly' | 'monthly';
  nextPayDate: string;
}