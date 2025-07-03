
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard,
  Settings,
  Users
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRBAC } from "@/hooks/useRBAC";

interface CorporateSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  requiredPermissions: string[];
}

export const CorporateSidebar = ({ isOpen, onToggle }: CorporateSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasAnyPermission, permissions } = useRBAC();

  const navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      requiredPermissions: ["canViewDashboard"]
    },
    {
      name: "Resource Management",
      href: "/resource-management",
      icon: Users,
      requiredPermissions: ["canViewResources", "canViewProjects"]
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      requiredPermissions: ["canAccessSettings"]
    }
  ];

  // Filter navigation items based on user permissions
  const filteredNavigationItems = navigationItems.filter(item => {
    if (item.requiredPermissions.length === 0) return true;
    return hasAnyPermission(item.requiredPermissions as any);
  });

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleDashboardIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <aside
      className={cn(
        "fixed left-0 h-full bg-white border-r border-soft-silver/30 transition-all duration-300 z-40 shadow-lg",
        isOpen ? "w-64" : "w-16",
        "top-0"
      )}
    >
      <nav className="px-2 space-y-2 pt-24">
        {filteredNavigationItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === "/resource-management" && location.pathname.startsWith("/resource-management"));
          const isDashboard = item.name === "Dashboard";
          
          return (
            <div key={item.name} className="relative group">
              {isDashboard ? (
                <div 
                  className={cn(
                    "flex items-center w-full rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-deep-blue" 
                      : "hover:bg-light-bg"
                  )}
                >
                  <Button
                    onClick={handleDashboardIconClick}
                    variant="ghost"
                    className={cn(
                      "p-3 rounded-xl mr-1 transition-all duration-200 hover:bg-transparent",
                      isActive 
                        ? "text-white hover:text-white" 
                        : "text-deep-blue hover:text-teal"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </Button>
                  {isOpen && (
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        "flex-1 text-left p-3 rounded-xl transition-all duration-200 font-medium hover:bg-transparent",
                        isActive 
                          ? "text-white" 
                          : "text-slate hover:text-deep-blue"
                      )}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => handleNavigation(item.href)}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left transition-all duration-200 p-3",
                    isActive 
                      ? "bg-deep-blue text-white hover:bg-deep-blue/90" 
                      : "text-slate hover:text-deep-blue hover:bg-light-bg"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {isOpen && (
                    <span className="ml-3 font-medium">
                      {item.name}
                    </span>
                  )}
                </Button>
              )}
              
              {!isOpen && (
                <div className="absolute left-16 top-0 bg-deep-blue text-white px-3 py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
