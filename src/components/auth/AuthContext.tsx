
import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "hr" | "resource_manager" | "leadership";

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
    if (email === "hr@zapcom.com" && password === "hr123") {
      setUser({
        id: "1",
        name: "Sarah Johnson",
        email: "hr@zapcom.com",
        role: "hr"
      });
      return true;
    } else if (email === "manager@zapcom.com" && password === "manager123") {
      setUser({
        id: "2",
        name: "Michael Chen",
        email: "manager@zapcom.com",
        role: "resource_manager"
      });
      return true;
    } else if (email === "leadership@zapcom.com" && password === "leadership123") {
      setUser({
        id: "3",
        name: "David Kumar",
        email: "leadership@zapcom.com",
        role: "leadership"
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
