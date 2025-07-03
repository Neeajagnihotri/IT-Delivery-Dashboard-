
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { CorporateHeader } from "./CorporateHeader";
import { CorporateSidebar } from "./CorporateSidebar";
import { useAuth } from "@/components/auth/AuthContext";

export const CorporateLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect to dashboard on login
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-light-bg flex">
      <CorporateSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole={user?.role}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <CorporateHeader 
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          user={user}
        />
        
        <main className={`flex-1 bg-light-bg pt-24 ${sidebarOpen ? 'px-4' : 'px-2'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
