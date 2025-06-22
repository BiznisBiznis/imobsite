import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { ADMIN_CONFIG } from "@/config/app";
import { jwtManager, isValidToken, isTokenExpired } from "@/utils/jwt";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (password: string) => boolean;
  logout: () => void;
  refreshToken: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Check if admin is already logged in on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("adminToken");
      console.log("Checking stored token:", storedToken ? "exists" : "none");

      if (storedToken) {
        if (isValidToken(storedToken) && !isTokenExpired(storedToken)) {
          setToken(storedToken);
          setIsAuthenticated(true);
          console.log("Admin authenticated with valid token");
        } else {
          console.log("Token invalid or expired, clearing storage");
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminAuth"); // Clean up old auth method
        }
      } else {
        // Check for old auth method and clean up
        const oldAuth = localStorage.getItem("adminAuth");
        if (oldAuth) {
          localStorage.removeItem("adminAuth");
        }
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    console.log("Attempting login with password:", password);
    // Simple password check - in production, this would be handled server-side
    if (password === ADMIN_CONFIG.defaultPassword) {
      console.log("Login successful");

      try {
        // Generate JWT token
        const newToken = jwtManager.generateToken("admin", "admin");
        setToken(newToken);
        setIsAuthenticated(true);

        // Store token in localStorage
        localStorage.setItem("adminToken", newToken);

        // Clean up old auth method
        localStorage.removeItem("adminAuth");

        console.log("JWT token generated and stored successfully");
        return true;
      } catch (error) {
        console.error("Error generating token:", error);
        return false;
      }
    }
    console.log("Login failed - incorrect password");
    return false;
  };

  const refreshToken = (): boolean => {
    try {
      if (!token) {
        return false;
      }

      const newToken = jwtManager.refreshToken(token);
      if (newToken) {
        setToken(newToken);
        localStorage.setItem("adminToken", newToken);
        console.log("Token refreshed successfully");
        return true;
      } else {
        console.log("Token refresh failed");
        logout();
        return false;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return false;
    }
  };

  const logout = () => {
    console.log("Logging out admin");
    setIsAuthenticated(false);
    setToken(null);
    try {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminAuth"); // Clean up old method
      console.log("All auth data cleared successfully");
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
