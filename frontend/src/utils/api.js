// ─── Axios API Instance ──────────────────────────────────────────
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://sweet-venom-backend.onrender.com/api',
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
      localStorage.removeItem('sv_token');
      localStorage.removeItem('sv_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;