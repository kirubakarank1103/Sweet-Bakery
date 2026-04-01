// ─── Axios API Instance ──────────────────────────────────────────
// All API calls go through this instance.
// It automatically attaches the JWT token from localStorage.
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach token ──────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sv_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: unwrap data, handle 401 ──────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired → clear storage and reload
      localStorage.removeItem('sv_token');
      localStorage.removeItem('sv_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;