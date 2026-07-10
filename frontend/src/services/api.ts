import axios, { type AxiosInstance } from 'axios';

// Base URL for the Spring Boot backend. Override via VITE_API_URL in .env.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor — attach JWT bearer token from localStorage
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('greenwood_auth');
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    // Silently ignore errors parsing auth from storage
    console.warn('Error reading auth token from storage');
  }
  return config;
});

/**
 * Response interceptor — handle 401 (Unauthorized) responses.
 * 
 * For JWT authentication:
 * - No token refresh endpoint exists (stateless JWT design)
 * - On 401: Clear auth and redirect to login for re-authentication
 * - Backend will return 401 if token is invalid or expired
 * - AuthContext handles token expiration check on app load
 */
let isRefreshing = false;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;

    // Handle 401 Unauthorized responses
    if (status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        // Clear authentication data
        localStorage.removeItem('greenwood_auth');

        // Redirect to login if on a protected route
        if (window.location.pathname.startsWith('/app')) {
          console.info('Session expired. Redirecting to login.');
          window.location.href = '/app/login';
        }
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
