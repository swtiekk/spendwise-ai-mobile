import { useCallback, useState } from 'react';
import { Messages } from '../constants/messages';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { useAuthStore } from '../store/useAuthStore';
import { LoginCredentials, RegisterCredentials } from '../types/auth';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError]         = useState<string | null>(null);

  // Read auth state from the store (shared across the whole app)
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(credentials);

      // ✅ Write to the global store so _layout.tsx can react
      setAuth(response.user, response.token);

      await storageService.setItem('auth_token', response.token);
      await storageService.setItem('user', response.user);

      return response.user;
    } catch (err: any) {
      const message = err?.message || Messages.auth.loginError;
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, [setAuth]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register(credentials);

      setAuth(response.user, response.token);

      await storageService.setItem('auth_token', response.token);
      await storageService.setItem('user', response.user);

      return response.user;
    } catch (err: any) {
      const message = err?.message || Messages.auth.registerSuccess;
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, [setAuth]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();

      // ✅ Clear the global store
      clearAuth();

      await storageService.removeItem('auth_token');
      await storageService.removeItem('user');
    } catch (err: any) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [clearAuth]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null),
  };
};