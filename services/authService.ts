import { AppConfig } from '../constants/config';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';

const BASE_URL = AppConfig.BASE_URL;

export const authService = {

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: credentials.email, // backend uses username field
        password: credentials.password,
      }),
    });
    if (!res.ok) throw new Error('Invalid email or password.');
    const data = await res.json();
    // fetch user profile after login
    const userRes = await fetch(`${BASE_URL}/auth/me/`, {
      headers: { Authorization: `Bearer ${data.access}` },
    });
    const userData = await userRes.json();
    return {
      user: {
        id:             String(userData.id),
        name:           userData.first_name || userData.username,
        email:          userData.email,
        incomeType:     userData.profile?.income_type  ?? 'other',
        incomeCycle:    userData.profile?.income_cycle ?? 'monthly',
        incomeAmount:   userData.profile?.income_amount ?? 0,
        nextIncomeDate: userData.profile?.next_income_date ?? '',
        createdAt:      '',
        updatedAt:      '',
      },
      token: data.access,
    };
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username:     credentials.email,
        email:        credentials.email,
        password:     credentials.password,
        first_name:   credentials.name,
        income_type:  credentials.incomeType  ?? 'other',
        income_cycle: credentials.incomeCycle ?? 'monthly',
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }
    // auto login after register
    return authService.login({
      email:    credentials.email,
      password: credentials.password,
    });
  },

  logout: async (): Promise<void> => {
    // JWT logout is handled client-side by clearing the token
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/auth/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to get current user.');
    const userData = await res.json();
    return {
      id:             String(userData.id),
      name:           userData.first_name || userData.username,
      email:          userData.email,
      incomeType:     userData.profile?.income_type  ?? 'other',
      incomeCycle:    userData.profile?.income_cycle ?? 'monthly',
      incomeAmount:   userData.profile?.income_amount ?? 0,
      nextIncomeDate: userData.profile?.next_income_date ?? '',
      createdAt:      '',
      updatedAt:      '',
    };
  },

  refreshToken: async (): Promise<{ token: string }> => {
    // for now just return empty — handle with re-login
    return { token: '' };
  },

  changePassword: async (_currentPassword: string, _newPassword: string): Promise<void> => {
    // implement later
  },
};