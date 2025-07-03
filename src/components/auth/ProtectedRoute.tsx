
import { useAuth } from "./AuthContext";
import { LoginForm } from "./LoginForm";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
};
