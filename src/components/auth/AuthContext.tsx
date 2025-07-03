
import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "hr" | "resource_manager" | "leadership" | "delivery_owner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo credentials for different roles
    if (email === "hr@zapcg.com" && password === "hr123") {
      setUser({
        id: "1",
        name: "Sarah Johnson",
        email: "hr@zapcg.com",
        role: "hr"
      });
      return true;
    } else if (email === "manager@zapcg.com" && password === "manager123") {
      setUser({
        id: "2",
        name: "Michael Chen",
        email: "manager@zapcg.com",
        role: "resource_manager"
      });
      return true;
    } else if (email === "leadership@zapcg.com" && password === "leadership123") {
      setUser({
        id: "3",
        name: "David Kumar",
        email: "leadership@zapcg.com",
        role: "leadership"
      });
      return true;
    } else if (email === "pm@zapcg.com" && password === "pm123") {
      setUser({
        id: "4",
        name: "Alex Rodriguez",
        email: "pm@zapcg.com",
        role: "delivery_owner"
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
