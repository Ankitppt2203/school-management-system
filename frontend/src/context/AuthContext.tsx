import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User, Role } from "../types";
import { authApi, type LoginResponseData } from "../services";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (
    username: string,
    password: string,
    role: Role
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// Helper function to normalize role to lowercase
const normalizeRole = (role: string): Role => {
  const normalized = role.toLowerCase();
  if (normalized === "admin" || normalized === "teacher" || normalized === "student" || normalized === "parent") {
    return normalized as Role;
  }
  return "student"; // default role
};

// Helper function to check if JWT token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const decoded = JSON.parse(atob(parts[1]));
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds

    return expirationTime < Date.now();
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "greenwood_auth";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token on app load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw);

        // Validate token is not expired
        if (parsed.token && !isTokenExpired(parsed.token)) {
          setUser(parsed.user);
          setToken(parsed.token);
        } else {
          // Token is expired or invalid, clear storage
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (err) {
      console.error("Error loading auth from storage:", err);
      localStorage.removeItem(STORAGE_KEY);
    }

    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string,
    roleFromUI: Role
  ) => {
    setError(null);

    try {
      // Call backend login API
      const response: LoginResponseData = await authApi.login(
        username,
        password
      );

      // Normalize role to lowercase for consistency
      const normalizedRole = normalizeRole(roleFromUI);

      // Create user object with normalized role
      const user: User = {
        id: username,
        name:
          normalizedRole === "admin"
            ? "Administrator"
            : normalizedRole === "teacher"
            ? "Teacher"
            : normalizedRole === "student"
            ? "Student"
            : "Parent",
        email: username,
        role: normalizedRole,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
          username
        )}`,
      };

      // Update state
      setUser(user);
      setToken(response.token);

      // Persist to localStorage
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user,
          token: response.token,
        })
      );
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please check your credentials.";

      setError(errorMessage);
      setUser(null);
      setToken(null);

      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextValue = {
    user,
    token,
    login,
    logout,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {

  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}