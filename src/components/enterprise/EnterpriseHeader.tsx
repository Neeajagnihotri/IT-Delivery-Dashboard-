
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Bell, 
  Search, 
  Settings, 
  LogOut,
  Building2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth/AuthContext";

interface EnterpriseHeaderProps {
  onSidebarToggle: () => void;
  user: any;
}

export const EnterpriseHeader = ({ onSidebarToggle, user }: EnterpriseHeaderProps) => {
  const { logout } = useAuth();

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'leadership':
        return 'default';
      case 'hr':
        return 'secondary';
      case 'resource_manager':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'leadership':
        return 'Leadership';
      case 'hr':
        return 'Human Resources';
      case 'resource_manager':
        return 'Resource Manager';
      default:
        return role;
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-900 dark:bg-slate-700 rounded-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Zapcom IT Delivery Platform
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
          <Search className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 h-auto p-2">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {user?.name}
                </p>
                <Badge variant={getRoleBadgeVariant(user?.role)} className="text-xs">
                  {getRoleDisplayName(user?.role)}
                </Badge>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-slate-600 text-white text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
