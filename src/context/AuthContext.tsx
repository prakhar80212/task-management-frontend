"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  role: string;
}

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check token validity
  const isTokenValid = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  // 🔹 Silent refresh
  const refreshAccessToken = async () => {
    try {
      const res = await api.post("/auth/refresh");
      localStorage.setItem("accessToken", res.data.accessToken);

      const decoded: DecodedToken = jwtDecode(res.data.accessToken);

      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      });
    } catch {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  // 🔹 On App Mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token && isTokenValid(token)) {
        const decoded: DecodedToken = jwtDecode(token);
        setUser({
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        });
      } else if (token) {
        await refreshAccessToken();
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("accessToken", res.data.accessToken);

    const decoded: DecodedToken = jwtDecode(res.data.accessToken);

    setUser({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};