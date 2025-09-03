// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function isTokenExpired(token) {
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refreshToken");

    const validToken = token && !isTokenExpired(token);
    setIsLoggedIn(validToken && !!refresh);
    setIsLoading(false);
  }, []);

  const login = () => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refreshToken");
    setIsLoggedIn(!!token && !!refresh);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
