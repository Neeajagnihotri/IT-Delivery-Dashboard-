
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthContext";
import { LogOut, Moon, Sun, Bell, Search, X, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Resource Allocation Update',
    message: 'John Doe has been allocated to E-commerce Platform project',
    time: '5 min ago',
    type: 'success',
    read: false
  },
  {
    id: '2',
    title: 'Project Deadline Alert',
    message: 'Mobile Banking App milestone due in 2 days',
    time: '1 hour ago',
    type: 'error',
    read: false
  },
  {
    id: '3',
    title: 'New Resource Added',
    message: 'Sarah Wilson joined the Development team',
    time: '3 hours ago',
    type: 'info',
    read: true
  },
  {
    id: '4',
    title: 'Skill Assessment Complete',
    message: 'Q4 skill assessments have been completed',
    time: '1 day ago',
    type: 'success',
    read: true
  }
];

const searchData = [
  { type: 'resource', name: 'John Doe', department: 'Engineering', status: 'Billable' },
  { type: 'resource', name: 'Sarah Wilson', department: 'Design', status: 'Available' },
  { type: 'project', name: 'E-commerce Platform', status: 'Active', progress: 75 },
  { type: 'project', name: 'Mobile Banking App', status: 'Active', progress: 60 },
  { type: 'skill', name: 'React.js', category: 'Frontend' },
  { type: 'skill', name: 'Python', category: 'Backend' },
  { type: 'department', name: 'Engineering', headCount: 15 },
  { type: 'department', name: 'Design', headCount: 8 }
];

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(mockNotifications);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredSearchResults = searchData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccountSettings = () => {
    navigate('/settings');
  };

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowNotifications(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const baseClasses = "w-2 h-2 rounded-full";
    switch (type) {
      case 'success': return <div className={`${baseClasses} bg-teal`} />;
      case 'warning': return <div className={`${baseClasses} bg-deep-blue`} />;
      case 'error': return <div className={`${baseClasses} bg-slate`} />;
      default: return <div className={`${baseClasses} bg-deep-blue`} />;
    }
  };

  const getSearchIcon = (type: string) => {
    switch (type) {
      case 'resource': return '👤';
      case 'project': return '📁';
      case 'skill': return '🎯';
      case 'department': return '🏢';
      default: return '📋';
    }
  };

  return (
    <>
      <header className="bg-white border-b border-soft-silver/30 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-deep-blue to-teal rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">Z</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-deep-blue to-teal bg-clip-text text-transparent">
                    Zapcom
                  </h1>
                  <p className="text-xs text-slate font-medium">
                    Enterprise Platform
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="bg-white border-soft-silver hover:border-teal text-deep-blue hover:text-teal hover:bg-light-bg transition-colors duration-300"
              >
                <Search className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline ml-2 px-1.5 py-0.5 text-xs bg-light-bg text-slate rounded">⌘K</kbd>
              </Button>

              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="bg-white border-soft-silver hover:border-teal text-deep-blue hover:text-teal hover:bg-light-bg transition-colors duration-300 relative"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-teal text-white p-0 flex items-center justify-center">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-soft-silver z-50"
                    >
                      <div className="p-4 border-b border-soft-silver">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-deep-blue">Notifications</h3>
                          {unreadCount > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={markAllAsRead}
                              className="text-xs text-teal hover:text-deep-blue hover:bg-light-bg transition-colors duration-300"
                            >
                              Mark all read
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-soft-silver last:border-b-0 cursor-pointer hover:bg-light-bg transition-colors duration-300 ${
                              !notification.read ? 'bg-light-bg' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-deep-blue">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-slate mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-slate mt-1">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="bg-white border-soft-silver hover:border-teal text-deep-blue hover:text-teal hover:bg-light-bg transition-colors duration-300"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleAccountSettings}
                className="bg-white border-soft-silver hover:border-teal text-deep-blue hover:text-teal hover:bg-light-bg transition-colors duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-deep-blue">
                  {user?.name}
                </p>
                <p className="text-xs text-slate capitalize">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
              
              <Avatar className="ring-2 ring-teal hover:ring-deep-blue transition-colors duration-300">
                <AvatarFallback className="bg-gradient-to-r from-deep-blue to-teal text-white font-semibold hover:from-teal hover:to-deep-blue transition-all duration-300">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="bg-white text-slate hover:text-deep-blue hover:bg-light-bg border-soft-silver hover:border-slate transition-colors duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
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
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate h-5 w-5" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search resources, projects, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-12 text-lg bg-white border-2 border-soft-silver focus:border-teal rounded-xl shadow-xl"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate hover:text-deep-blue hover:bg-light-bg transition-colors duration-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-white rounded-xl shadow-xl border border-soft-silver max-h-80 overflow-y-auto"
                >
                  {filteredSearchResults.length > 0 ? (
                    filteredSearchResults.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 hover:bg-light-bg cursor-pointer border-b border-soft-silver last:border-b-0 transition-colors duration-300"
                        onClick={() => {
                          setShowSearch(false);
                          setSearchQuery('');
                        }}
                      >
                        <span className="text-lg">{getSearchIcon(item.type)}</span>
                        <div className="flex-1">
                          <p className="font-medium text-deep-blue">{item.name}</p>
                          <p className="text-sm text-slate">
                            {item.type === 'resource' && `${item.department} • ${item.status}`}
                            {item.type === 'project' && `${item.status} • ${item.progress}% complete`}
                            {item.type === 'skill' && item.category}
                            {item.type === 'department' && `${item.headCount} members`}
                          </p>
                        </div>
                        <Badge variant="outline" className="capitalize border-teal text-teal">
                          {item.type}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside handlers */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </>
  );
};
