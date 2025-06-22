import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { authService } from "@/services/api";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
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
    const validateToken = async () => {
      try {
        const storedToken = localStorage.getItem("adminToken");
        console.log("Checking stored token:", storedToken ? "exists" : "none");

        if (storedToken) {
          setToken(storedToken);
          // Validate token with backend
          const response = await authService.validateToken();

          if (response.success && response.data.valid) {
            setIsAuthenticated(true);
            console.log("Token validated successfully");
          } else {
            // Token invalid, remove it
            localStorage.removeItem("adminToken");
            setToken(null);
            console.log("Token validation failed");
          }
        }
      } catch (error) {
        console.error("Error validating token:", error);
        localStorage.removeItem("adminToken");
        setToken(null);
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  const login = async (password: string): Promise<boolean> => {
    console.log("Attempting backend login");
    setIsLoading(true);

    try {
      const response = await authService.login({ password });

      if (response.success && response.data.token) {
        console.log("Backend login successful");
        setIsAuthenticated(true);
        setToken(response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        return true;
      } else {
        console.log("Backend login failed");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("Logging out admin");
    setIsAuthenticated(false);
    setToken(null);
    try {
      localStorage.removeItem("adminToken");
      console.log("Token cleared successfully");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, token }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
