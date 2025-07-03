
import { useAuth } from "@/components/auth/AuthContext";
import { EnterpriseDashboard } from "@/components/enterprise/EnterpriseDashboard";
import { LoginForm } from "@/components/auth/LoginForm";

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return <EnterpriseDashboard />;
};

export default Index;
