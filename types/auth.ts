/**
 * Authentication related types
 */

export interface LoginCredentials {
  username?: string;
  email?:    string;   // ← add this
  password:  string;
}

export interface RegisterCredentials extends LoginCredentials {
  name:        string;
  email:       string;        // ← ADD THIS
  incomeType:  'salary' | 'allowance' | 'freelance' | 'other';
  incomeCycle: 'weekly' | 'biweekly' | 'monthly';
}

export interface User {
  id: string;
  username: string; // ✅ changed
  name: string;
  incomeType: 'salary' | 'allowance' | 'freelance' | 'other';
  incomeCycle: 'weekly' | 'biweekly' | 'monthly';
  incomeAmount: number;
  nextIncomeDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}