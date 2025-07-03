
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard,
  Users,
  FolderOpen,
  TrendingUp,
  AlertTriangle,
  Target,
  DollarSign,
  BarChart3,
  Building2,
  UserCheck,
  Briefcase
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface EnterpriseSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  roles: string[];
  description?: string;
}

export const EnterpriseSidebar = ({ isOpen, userRole }: EnterpriseSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      roles: ["hr", "resource_manager", "leadership"],
      description: "Executive overview"
    },
    {
      name: "Resource Management",
      href: "/resources",
      icon: Users,
      roles: ["hr", "resource_manager", "leadership"]
    },
    {
      name: "Project Health",
      href: "/projects",
      icon: FolderOpen,
      roles: ["resource_manager", "leadership"]
    },
    {
      name: "Deliverables",
      href: "/deliverables",
      icon: Target,
      roles: ["resource_manager", "leadership"]
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: TrendingUp,
      roles: ["hr", "resource_manager", "leadership"]
    },
    {
      name: "Engineering Metrics",
      href: "/engineering",
      icon: BarChart3,
      roles: ["resource_manager", "leadership"]
    },
    {
      name: "QA Dashboard",
      href: "/qa",
      icon: UserCheck,
      roles: ["resource_manager", "leadership"]
    },
    {
      name: "Escalations",
      href: "/escalations",
      icon: AlertTriangle,
      roles: ["resource_manager", "leadership"]
    },
    {
      name: "Financial Overview",
      href: "/financial",
      icon: DollarSign,
      roles: ["hr", "leadership"]
    },
    {
      name: "HR Management",
      href: "/hr",
      icon: Briefcase,
      roles: ["hr"]
    },
    {
      name: "Department Performance",
      href: "/departments",
      icon: Building2,
      roles: ["hr", "leadership"]
    }
  ];

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(userRole || '')
  );

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 z-50 shadow-lg",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4">
        {isOpen && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Enterprise Portal
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              IT Delivery Platform
            </p>
          </div>
        )}
      </div>

      <nav className="px-2 space-y-2">
        {filteredNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left transition-all duration-200",
                isOpen ? "px-4" : "px-2",
                isActive 
                  ? "bg-slate-900 text-white dark:bg-slate-700" 
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700"
              )}
            >
              <item.icon className={cn("h-5 w-5", isOpen ? "mr-3" : "")} />
              {isOpen && (
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-xs opacity-75">{item.description}</div>
                  )}
                </div>
              )}
            </Button>
          );
        })}
      </nav>

      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Zapcom Enterprise Platform
            </p>
            <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
              v2.0.0
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
