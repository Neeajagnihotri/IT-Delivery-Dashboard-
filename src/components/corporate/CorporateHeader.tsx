
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Search, 
  LogOut,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth/AuthContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CorporateHeaderProps {
  onSidebarToggle: () => void;
  user: any;
}

export const CorporateHeader = ({ onSidebarToggle, user }: CorporateHeaderProps) => {
  const { logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Project Alpha milestone completed", time: "2 min ago", type: "success" },
    { id: 2, message: "Resource allocation updated", time: "15 min ago", type: "info" },
    { id: 3, message: "Budget alert for Beta Platform", time: "1 hour ago", type: "warning" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Update last updated time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    // Get all text content in the current page
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    // Clear previous highlights
    const existingHighlights = document.querySelectorAll('.search-highlight');
    existingHighlights.forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el);
        parent.normalize();
      }
    });
    
    let node;
    let firstMatch = null;
    
    while (node = walker.nextNode()) {
      const text = node.textContent || '';
      const regex = new RegExp(`(${query})`, 'gi');
      
      if (regex.test(text)) {
        const parent = node.parentElement;
        if (parent && !parent.closest('.search-highlight')) {
          const highlightedHTML = text.replace(regex, '<span class="search-highlight bg-yellow-300 px-1 rounded">$1</span>');
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = highlightedHTML;
          
          while (tempDiv.firstChild) {
            parent.insertBefore(tempDiv.firstChild, node);
          }
          parent.removeChild(node);
          
          if (!firstMatch) {
            firstMatch = parent.querySelector('.search-highlight');
          }
        }
      }
    }
    
    // Scroll to first match
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

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
    <>
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-black/20 flex items-center justify-between px-6 shadow-lg z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg">
              <img 
                src="/lovable-uploads/be66b7b1-2eaf-4a1f-8293-a70e0bf4541e.png" 
                alt="Zapcom Logo" 
                className="h-8 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-deep-blue">
                IT Delivery Summary Dashboard
              </h1>
              <p className="text-sm text-slate-600">
                Executive overview of project delivery health and performance
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-600 border border-black/20 hover:border-black/40"
            onClick={() => setShowSearch(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-600 relative border border-black/20 hover:border-black/40">
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-deep-blue rounded-full text-xs"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border border-black/20 bg-white shadow-lg">
              <div className="p-3 border-b">
                <h3 className="font-semibold text-deep-blue">Notifications</h3>
              </div>
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-3 flex flex-col items-start">
                  <span className="text-sm text-deep-blue">{notification.message}</span>
                  <span className="text-xs text-slate mt-1">{notification.time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">
              {user?.name}
            </p>
            <Badge variant={getRoleBadgeVariant(user?.role)} className="text-xs mb-1">
              {getRoleDisplayName(user?.role)}
            </Badge>
            <p className="text-xs text-slate-600">Last updated: {formatLastUpdated(lastUpdated)}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 rounded-full border border-black/20 hover:border-black/40">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-deep-blue text-white text-sm font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 border border-black/20 bg-white shadow-lg">
              <DropdownMenuItem onClick={logout} className="text-deep-blue hover:bg-light-bg">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search within current page..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchQuery);
                      setShowSearch(false);
                    }
                  }}
                  className="w-full h-14 pl-12 pr-12 text-lg bg-white border-2 border-black/20 focus:border-black/40 rounded-xl shadow-xl placeholder:text-deep-blue"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-black"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-center">
                <Button
                  onClick={() => {
                    handleSearch(searchQuery);
                    setShowSearch(false);
                  }}
                  className="bg-deep-blue hover:bg-deep-blue/90 text-white"
                >
                  Search
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
