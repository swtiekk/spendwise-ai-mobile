import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';

const MOCK_TOKEN = 'mock-jwt-token-spendwise-2025';

const mockUser: User = {
  id:             'u1',
  name:           'New User',
  email:          'user@example.com',
  incomeType:     'other',
  incomeCycle:    'monthly',
  incomeAmount:   0,
  nextIncomeDate: '',
  createdAt:      new Date().toISOString(),
  updatedAt:      new Date().toISOString(),
};

export const authService = {

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 800));
    // Accept any login for prototype purposes, but return the "real" user state
    return { user: mockUser, token: MOCK_TOKEN };
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 800));
    return {
      user: {
        id:             'u_new',
        name:           credentials.name,
        email:          credentials.email,
        incomeType:     credentials.incomeType  ?? 'other',
        incomeCycle:    credentials.incomeCycle ?? 'monthly',
        incomeAmount:   0,
        nextIncomeDate: '',
        createdAt:      new Date().toISOString(),
        updatedAt:      new Date().toISOString(),
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
