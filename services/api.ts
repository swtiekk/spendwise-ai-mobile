// ── Mock API — no real backend calls ─────────────────────
// Real axios calls are disabled until backend is ready.
// authService.ts handles all mock responses directly.

const api = {
  get:    async (_url: string, _config?: any) => ({ data: {} }),
  post:   async (_url: string, _data?: any, _config?: any) => ({ data: {} }),
  put:    async (_url: string, _data?: any, _config?: any) => ({ data: {} }),
  patch:  async (_url: string, _data?: any, _config?: any) => ({ data: {} }),
  delete: async (_url: string, _config?: any) => ({ data: {} }),
};

export default api;