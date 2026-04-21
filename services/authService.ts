import { AppConfig } from '../constants/config';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';

const BASE_URL = AppConfig.BASE_URL;

export const authService = {

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const username = credentials.username ?? credentials.email ?? '';

    console.log('=== LOGIN DEBUG ===');
    console.log('username resolved:', username);

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':       'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: credentials.password,
      }),
    });

    console.log('Login status:', res.status);

    if (!res.ok) {
      let errMsg = 'Invalid username or password.';
      try {
        const err = await res.json();
        if (Array.isArray(err.detail)) {
          errMsg = err.detail
            .map((e: any) => `${e.loc?.slice(-1)[0]}: ${e.msg}`)
            .join(', ');
        } else {
          errMsg = err.detail ?? errMsg;
        }
      } catch {}
      throw new Error(errMsg);
    }

    const data = await res.json();
    const userRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    if (!userRes.ok) throw new Error('Failed to fetch user profile.');
    const userData = await userRes.json();

    return {
      user: {
        id:             String(userData.id),
        name:           userData.first_name || userData.username,
        username:       userData.username,
        incomeType:     userData.income_type   ?? 'other',
        incomeCycle:    userData.income_cycle  ?? 'monthly',
        incomeAmount:   userData.income_amount ?? 0,
        nextIncomeDate: '',
        createdAt:      '',
        updatedAt:      '',
      },
      token: data.access_token,
    };
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const username = credentials.username
      ?? credentials.email.split('@')[0].toLowerCase();

    console.log('=== REGISTER DEBUG ===');
    console.log('username:', username);
    console.log('email:', credentials.email);
    console.log('name:', credentials.name);
    console.log('income_type:', credentials.incomeType);
    console.log('income_cycle:', credentials.incomeCycle);

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        username:     username,
        email:        credentials.email,
        password:     credentials.password,
        first_name:   credentials.name       ?? '',
        income_type:  credentials.incomeType  ?? 'other',
        income_cycle: credentials.incomeCycle ?? 'monthly',
      }),
    });

    console.log('Register status:', res.status);
    const responseText = await res.text();
    console.log('Register response:', responseText);

    if (!res.ok) {
      let errMsg = 'Registration failed.';
      try {
        const err = JSON.parse(responseText);
        if (Array.isArray(err.detail)) {
          errMsg = err.detail
            .map((e: any) => `${e.loc?.slice(-1)[0]}: ${e.msg}`)
            .join(', ');
        } else {
          errMsg = err.detail ?? errMsg;
        }
      } catch {}
      throw new Error(errMsg);
    }

    // ── Auto-login after register ─────────────────────────
console.log('=== AUTO LOGIN DEBUG ===');
console.log('Attempting login with username:', username);
console.log('Password length:', credentials.password.length);

const loginRes = await fetch(`${BASE_URL}/auth/login`, {
  method:  'POST',
  headers: { 'Content-Type': 'application/json' },  // ← JSON not form
  body:    JSON.stringify({
    username: username,
    password: credentials.password,
  }),
});

console.log('Auto-login status:', loginRes.status);
const loginText = await loginRes.text();
console.log('Auto-login response:', loginText);

if (!loginRes.ok) {
  throw new Error(`Auto-login failed: ${loginText}`);
}

    const loginData = JSON.parse(loginText);

    const userRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${loginData.access_token}` },
    });

    const userData = await userRes.json();
    console.log('Auto-login user data:', userData);

    return {
      user: {
        id:             String(userData.id),
        name:           userData.first_name || userData.username,
        username:       userData.username,
        incomeType:     userData.income_type   ?? 'other',
        incomeCycle:    userData.income_cycle  ?? 'monthly',
        incomeAmount:   userData.income_amount ?? 0,
        nextIncomeDate: '',
        createdAt:      '',
        updatedAt:      '',
      },
      token: loginData.access_token,
    };
  },

  logout: async (): Promise<void> => {
    // JWT logout handled client-side
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Failed to get current user.');

    const userData = await res.json();

    return {
      id:             String(userData.id),
      name:           userData.first_name || userData.username,
      username:       userData.username,
      incomeType:     userData.income_type   ?? 'other',
      incomeCycle:    userData.income_cycle  ?? 'monthly',
      incomeAmount:   userData.income_amount ?? 0,
      nextIncomeDate: '',
      createdAt:      '',
      updatedAt:      '',
    };
  },

  refreshToken: async (): Promise<{ token: string }> => {
    return { token: '' };
  },

  changePassword: async (
    _currentPassword: string,
    _newPassword: string
  ): Promise<void> => {},

};