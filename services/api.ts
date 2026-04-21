import { AppConfig } from '../constants/config';
import { useAuthStore } from '../store/useAuthStore';

const BASE_URL = AppConfig.BASE_URL;

const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const getToken = () => useAuthStore.getState().token;

const handleError = async (res: Response, method: string, url: string) => {
  let errorDetail = `${method} ${url} failed: ${res.status}`;

  try {
    const e = await res.json();

    // ✅ FastAPI style
    if (e.detail) {
      errorDetail = typeof e.detail === 'string'
        ? e.detail
        : JSON.stringify(e.detail);
    } else {
      errorDetail = JSON.stringify(e);
    }
  } catch {}

  throw new Error(errorDetail);
};

const api = {
  get: async (url: string) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: getHeaders(getToken() ?? undefined),
    });

    if (!res.ok) await handleError(res, 'GET', url);

    const data = await res.json();
    return { data };
  },

  post: async (url: string, body?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: getHeaders(getToken() ?? undefined),
      body: JSON.stringify(body),
    });

    if (!res.ok) await handleError(res, 'POST', url);

    const data = await res.json();
    return { data };
  },

  patch: async (url: string, body?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      headers: getHeaders(getToken() ?? undefined),
      body: JSON.stringify(body),
    });

    if (!res.ok) await handleError(res, 'PATCH', url);

    const data = await res.json();
    return { data };
  },

  put: async (url: string, body?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: getHeaders(getToken() ?? undefined),
      body: JSON.stringify(body),
    });

    if (!res.ok) await handleError(res, 'PUT', url);

    const data = await res.json();
    return { data };
  },

  delete: async (url: string) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getHeaders(getToken() ?? undefined),
    });

    if (!res.ok) await handleError(res, 'DELETE', url);

    // FastAPI may return 204 or JSON
    try {
      const data = await res.json();
      return { data };
    } catch {
      return { data: {} };
    }
  },
};

export default api;