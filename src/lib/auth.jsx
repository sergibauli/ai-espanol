import { useAuth, useUser } from "@clerk/clerk-react";
import * as React from "react";
const AUTH_FLAG_KEY = "dele_auth";
const AUTH_EXPIRY_KEY = "dele_expiry";
const ADMIN_SESSION_MS = 5400 * 1000;
const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "314159";
const AuthContext = React.createContext({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: () => false,
  logout: () => {},
});
function useClerkAuthSafe() {
  try {
    return useAuth();
  } catch {
    return {
      isLoaded: true,
      isSignedIn: false,
    };
  }
}
function useClerkUserSafe() {
  try {
    return useUser();
  } catch {
    return {
      user: null,
    };
  }
}
function AuthProvider({ children }) {
  const [t, setT] = React.useState(null);
  const u = useClerkAuthSafe();
  const s = useClerkUserSafe();
  const d = u.isLoaded ?? true;
  const m = u.isSignedIn ?? false;
  const g = s.user ?? null;
  React.useEffect(() => {
    try {
      const P = sessionStorage.getItem(AUTH_FLAG_KEY);
      const H = sessionStorage.getItem(AUTH_EXPIRY_KEY);
      if (P === "true" && H && Date.now() < Number(H)) {
        setT(true);
      } else {
        sessionStorage.removeItem(AUTH_FLAG_KEY);
        sessionStorage.removeItem(AUTH_EXPIRY_KEY);
        setT(false);
      }
    } catch {
      setT(false);
    }
  }, []);
  const isLoading = !(d === true) || !(t !== null);
  const j = m === true;
  const _ =
    t === true ||
    (() => {
      try {
        return (
          sessionStorage.getItem(AUTH_FLAG_KEY) === "true" &&
          Date.now() < Number(sessionStorage.getItem(AUTH_EXPIRY_KEY))
        );
      } catch {
        return false;
      }
    })();
  const isAuthenticated = j || _;
  let w = null;
  if (j && g) {
    w = {
      id: g.id || "clerk-user",
      name: g.firstName || g.username || g.emailAddresses?.[0]?.emailAddress || "Usuario Clerk",
      email: g.emailAddresses?.[0]?.emailAddress,
      imageUrl: g.imageUrl,
    };
  } else if (_) {
    w = {
      id: "admin",
      name: "Admin",
    };
  }
  const login = React.useCallback((P, H) => {
    if (P.trim() === ADMIN_USER && H.trim() === ADMIN_PASSWORD) {
      try {
        const Q = Date.now() + ADMIN_SESSION_MS;
        sessionStorage.setItem(AUTH_FLAG_KEY, "true");
        sessionStorage.setItem(AUTH_EXPIRY_KEY, String(Q));
      } catch {}
      setT(true);
      return true;
    }
    return false;
  }, []);
  const logout = React.useCallback(() => {
    try {
      sessionStorage.removeItem(AUTH_FLAG_KEY);
      sessionStorage.removeItem(AUTH_EXPIRY_KEY);
    } catch {}
    setT(false);
    const window_Clerk = window.Clerk;
    if (window_Clerk?.signOut) {
      window_Clerk.signOut().catch(() => {});
    }
    window.location.href = `${location.pathname}#/login`;
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user: w,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAppAuth() {
  return React.useContext(AuthContext);
}
export { useAppAuth, AuthProvider };
