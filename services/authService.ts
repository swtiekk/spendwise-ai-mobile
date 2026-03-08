import { currentUser } from '@/data/mockData';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';

const MOCK_TOKEN = 'mock-jwt-token-spendwise-2025';

const mockUser: User = {
  id:             'u1',
  name:           currentUser.name,
  email:          currentUser.email,
  incomeType:     'salary',    // ✅ mapped from 'Monthly Salary' → valid union value
  incomeCycle:    'monthly',   // ✅ mapped from 'Monthly' → valid union value
  incomeAmount:   currentUser.income,
  nextIncomeDate: '',          // ✅ required by User type (not in mockData, defaulted)
  createdAt:      '',          // ✅ required by User type (not in mockData, defaulted)
  updatedAt:      '',          // ✅ required by User type (not in mockData, defaulted)
  // ❌ removed: balance, spenderType — these fields don't exist on User type
};

export const authService = {

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 800));
    if (credentials.email !== currentUser.email) {
      throw new Error(`Email not found. Use: ${currentUser.email}`);
    }
    return { user: mockUser, token: MOCK_TOKEN };
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 800));
    return {
      user: {
        id:             'u_new',
        name:           credentials.name,
        email:          credentials.email,
        incomeType:     credentials.incomeType  ?? 'other',    // ✅ valid union value
        incomeCycle:    credentials.incomeCycle ?? 'monthly',  // ✅ valid union value
        incomeAmount:   0,
        nextIncomeDate: '',
        createdAt:      new Date().toISOString(),
        updatedAt:      new Date().toISOString(),
        // ❌ removed: balance, income, spenderType — not on User type
      },
      token: MOCK_TOKEN,
    };
  },

  logout: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300));
  },

  getCurrentUser: async (): Promise<User> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockUser;
  },

  refreshToken: async (): Promise<{ token: string }> => {
    await new Promise((r) => setTimeout(r, 300));
    return { token: MOCK_TOKEN };
  },

  changePassword: async (_currentPassword: string, _newPassword: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 500));
  },
};