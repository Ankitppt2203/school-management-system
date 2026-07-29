import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
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
      localStorage.removeItem("token"); // Remove the legacy key left by earlier app versions.
      if (window.location.pathname.startsWith("/app")) window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
