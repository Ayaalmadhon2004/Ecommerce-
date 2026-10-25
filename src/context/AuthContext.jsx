import { createContext, useContext, useState, useCallback, useMemo } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "username";

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch (e) {
    /* storage unavailable: state still works for this session */
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStorage(TOKEN_KEY));
  const [user, setUser] = useState(() => readStorage(USER_KEY));

  const login = useCallback((newToken, username) => {
    setToken(newToken);
    setUser(username);
    writeStorage(TOKEN_KEY, newToken);
    writeStorage(USER_KEY, username);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    writeStorage(TOKEN_KEY, null);
    writeStorage(USER_KEY, null);
  }, []);

  const value = useMemo(
    () => ({ isLoggedIn: !!token, user, login, logout }),
    [token, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
