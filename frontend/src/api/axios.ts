import axios from "axios";

// Keep this client usable in local development even when no .env file exists.
// Without the fallback, requests such as /students go to the Vite server
// instead of the Spring Boot API and the Students page fails to load.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("greenwood_auth");
    const token = raw ? JSON.parse(raw).token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    localStorage.removeItem("greenwood_auth");
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("greenwood_auth");
      localStorage.removeItem("token");
      if (window.location.pathname.startsWith("/app")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
