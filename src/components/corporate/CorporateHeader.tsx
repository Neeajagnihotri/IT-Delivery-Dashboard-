
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Search, 
  LogOut,
  X,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth/AuthContext";
import { useState, useEffect, useRef } from "react";
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
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Project Alpha milestone completed", time: "2 min ago", type: "success" },
    { id: 2, message: "Resource allocation updated", time: "15 min ago", type: "info" },
    { id: 3, message: "Budget alert for Beta Platform", time: "1 hour ago", type: "warning" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Update last updated time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Focus search input when expanded
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Handle escape key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSearch(false);
        clearSearch();
      }
    };

    if (showSearch) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showSearch]);

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentMatchIndex(0);
    setTotalMatches(0);
    // Clear previous highlights
    const existingHighlights = document.querySelectorAll('.search-highlight');
    existingHighlights.forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el);
        parent.normalize();
      }
    });
  };

  const performSearch = (query: string) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    // Clear previous highlights
    clearSearch();
    setSearchQuery(query);

    // Get all text nodes in the document
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip script, style, and our header elements
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          const tagName = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript'].includes(tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Skip header elements to avoid highlighting search input
          if (parent.closest('header')) {
            return NodeFilter.FILTER_REJECT;
          }
          
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    let matchCount = 0;
    const matches: HTMLElement[] = [];

    // Create case-insensitive regex with word boundaries for better matching
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

    while (node = walker.nextNode()) {
      const text = node.textContent || '';
      
      if (regex.test(text)) {
        const parent = node.parentElement;
        if (parent && !parent.closest('.search-highlight')) {
          // Replace text with highlighted version
          const highlightedHTML = text.replace(regex, (match, group1, offset) => {
            matchCount++;
            return `<span class="search-highlight bg-yellow-300 px-1 rounded font-semibold" data-match-index="${matchCount - 1}">${group1}</span>`;
          });
          
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = highlightedHTML;
          
          // Replace the text node with highlighted content
          while (tempDiv.firstChild) {
            parent.insertBefore(tempDiv.firstChild, node);
          }
          parent.removeChild(node);
          
          // Collect all highlights from this replacement
          const newHighlights = parent.querySelectorAll('.search-highlight');
          matches.push(...Array.from(newHighlights) as HTMLElement[]);
        }
      }
    }

    setTotalMatches(matchCount);
    setCurrentMatchIndex(matchCount > 0 ? 0 : -1);

    // Scroll to first match
    if (matches.length > 0) {
      scrollToMatch(0, matches);
    }
  };

  const scrollToMatch = (index: number, matches?: HTMLElement[]) => {
    const highlights = matches || Array.from(document.querySelectorAll('.search-highlight')) as HTMLElement[];
    if (highlights[index]) {
      // Remove previous active highlight
      document.querySelectorAll('.search-highlight-active').forEach(el => {
        el.classList.remove('search-highlight-active', 'bg-orange-400');
        el.classList.add('bg-yellow-300');
      });
      
      // Add active highlight
      const activeMatch = highlights[index];
      activeMatch.classList.add('search-highlight-active', 'bg-orange-400');
      activeMatch.classList.remove('bg-yellow-300');
      
      // Scroll to match
      activeMatch.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  };

  const navigateToNextMatch = () => {
    if (totalMatches > 0) {
      const nextIndex = (currentMatchIndex + 1) % totalMatches;
      setCurrentMatchIndex(nextIndex);
      scrollToMatch(nextIndex);
    }
  };

  const navigateToPrevMatch = () => {
    if (totalMatches > 0) {
      const prevIndex = currentMatchIndex === 0 ? totalMatches - 1 : currentMatchIndex - 1;
      setCurrentMatchIndex(prevIndex);
      scrollToMatch(prevIndex);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
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
        {/* Expandable Search Bar */}
        <div className="flex items-center">
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 mr-2">
                  <div className="flex items-center border border-black/20 rounded-lg bg-white">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search within page..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 border-0 focus:ring-0 focus:outline-none"
                    />
                    {totalMatches > 0 && (
                      <div className="flex items-center space-x-1 px-2 border-l border-black/20">
                        <span className="text-xs text-slate-600">
                          {currentMatchIndex + 1}/{totalMatches}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={navigateToPrevMatch}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={navigateToNextMatch}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="text-deep-blue hover:text-deep-blue/80"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowSearch(false);
                      clearSearch();
                    }}
                    className="text-slate-600 hover:text-black"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!showSearch && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 border border-black/20 hover:border-black/40"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>
        
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
  );
};
