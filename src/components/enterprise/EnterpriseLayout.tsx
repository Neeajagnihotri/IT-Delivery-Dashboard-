
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EnterpriseHeader } from "./EnterpriseHeader";
import { EnterpriseSidebar } from "./EnterpriseSidebar";
import { useAuth } from "@/components/auth/AuthContext";

export const EnterpriseLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <EnterpriseSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole={user?.role}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <EnterpriseHeader 
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          user={user}
        />
        
        <main className={`${sidebarOpen ? 'p-6' : 'p-2'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
