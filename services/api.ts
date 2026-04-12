import { AppConfig } from '../constants/config';
import { useAuthStore } from '../store/useAuthStore';

const BASE_URL = AppConfig.BASE_URL;

const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const getToken = () => useAuthStore.getState().token;

const api = {
  get: async (url: string, _config?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: getHeaders(getToken() ?? undefined),
    });
    if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
    const data = await res.json();
    return { data };
  },

  post: async (url: string, body?: any, _config?: any) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: getHeaders(token ?? undefined),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }
    const data = await res.json();
    return { data };
  },

  patch: async (url: string, body?: any, _config?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      headers: getHeaders(getToken() ?? undefined),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PATCH ${url} failed: ${res.status}`);
    const data = await res.json();
    return { data };
  },

  put: async (url: string, body?: any, _config?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: getHeaders(getToken() ?? undefined),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT ${url} failed: ${res.status}`);
    const data = await res.json();
    return { data };
  },

  delete: async (url: string, _config?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getHeaders(getToken() ?? undefined),
    });
    if (!res.ok) throw new Error(`DELETE ${url} failed: ${res.status}`);
    return { data: {} };
  },
};

export default api;