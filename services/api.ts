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
    if (!res.ok) {
      let errorDetail = `GET ${url} failed: ${res.status}`;
      try { const e = await res.json(); errorDetail = JSON.stringify(e); } catch {}
      throw new Error(errorDetail);
    }
    const data = await res.json();
    return { data };
  },

  post: async (url: string, body?: any, _config?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: getHeaders(getToken() ?? undefined),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let errorDetail = `POST ${url} failed: ${res.status}`;
      try { const e = await res.json(); errorDetail = JSON.stringify(e); } catch {}
      throw new Error(errorDetail);
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
    if (!res.ok) {
      let errorDetail = `PATCH ${url} failed: ${res.status}`;
      try { const e = await res.json(); errorDetail = JSON.stringify(e); } catch {}
      throw new Error(errorDetail);
    }
    const data = await res.json();
    return { data };
  },

  put: async (url: string, body?: any, _config?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: getHeaders(getToken() ?? undefined),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let errorDetail = `PUT ${url} failed: ${res.status}`;
      try { const e = await res.json(); errorDetail = JSON.stringify(e); } catch {}
      throw new Error(errorDetail);
    }
    const data = await res.json();
    return { data };
  },

  delete: async (url: string, _config?: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getHeaders(getToken() ?? undefined),
    });
    if (!res.ok) {
      let errorDetail = `DELETE ${url} failed: ${res.status}`;
      try { const e = await res.json(); errorDetail = JSON.stringify(e); } catch {}
      throw new Error(errorDetail);
    }
    // 204 No Content — no body to parse
    return { data: {} };
  },
};

export default api;