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

    // Get all text nodes in the document body (excluding header)
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
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
          
          // Only accept nodes with text content that matches our query
          const text = node.textContent || '';
          if (text.trim().toLowerCase().includes(query.toLowerCase())) {
            return NodeFilter.FILTER_ACCEPT;
          }
          
          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    let node;
    const allHighlights: HTMLElement[] = [];
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

    // Collect all text nodes that contain the search term
    const nodesToProcess: Text[] = [];
    while (node = walker.nextNode()) {
      nodesToProcess.push(node as Text);
    }

    // Process each text node
    nodesToProcess.forEach(textNode => {
      const text = textNode.textContent || '';
      const matches = Array.from(text.matchAll(regex));
      
      if (matches.length > 0) {
        const parent = textNode.parentElement;
        if (parent) {
          // Create a document fragment to hold the new nodes
          const fragment = document.createDocumentFragment();
          let lastIndex = 0;

          matches.forEach((match, index) => {
            const matchStart = match.index!;
            const matchEnd = matchStart + match[0].length;

            // Add text before the match
            if (matchStart > lastIndex) {
              fragment.appendChild(document.createTextNode(text.slice(lastIndex, matchStart)));
            }

            // Create highlighted span for the match
            const highlightSpan = document.createElement('span');
            highlightSpan.className = 'search-highlight bg-yellow-300 px-1 rounded font-semibold';
            highlightSpan.textContent = match[0];
            highlightSpan.setAttribute('data-match-index', allHighlights.length.toString());
            fragment.appendChild(highlightSpan);
            allHighlights.push(highlightSpan);

            lastIndex = matchEnd;
          });

          // Add remaining text after the last match
          if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
          }

          // Replace the original text node with the fragment
          parent.insertBefore(fragment, textNode);
          parent.removeChild(textNode);
        }
      }
    });

    setTotalMatches(allHighlights.length);
    setCurrentMatchIndex(allHighlights.length > 0 ? 0 : -1);

    // Scroll to first match
    if (allHighlights.length > 0) {
      scrollToMatch(0, allHighlights);
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

  const handleCloseSearch = () => {
    setShowSearch(false);
    clearSearch();
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
      <div className="flex items-center space-x-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg">
            <img 
              src="/lovable-uploads/be66b7b1-2eaf-4a1f-8293-a70e0bf4541e.png" 
              alt="Zapcom Logo" 
              className="h-8 w-auto"
            />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-deep-blue">
              IT Delivery Summary Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Executive overview of project delivery health and performance
            </p>
          </div>
          <div className="lg:hidden">
            <h1 className="text-lg font-bold text-deep-blue">
              Dashboard
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4 flex-1 justify-end">
        {/* Expandable Search Bar */}
        <div className="flex items-center relative">
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden absolute right-12 top-0 z-10"
              >
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="flex items-center border border-black/20 rounded-lg bg-white shadow-lg min-w-[280px] md:min-w-[320px]">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search within page..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 focus:ring-0 focus:outline-none pr-20"
                    />
                    <div className="flex items-center space-x-1 px-2 border-l border-black/20 absolute right-0 bg-white rounded-r-lg">
                      {totalMatches > 0 && (
                        <>
                          <span className="text-xs text-slate-600 whitespace-nowrap">
                            {currentMatchIndex + 1}/{totalMatches}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={navigateToPrevMatch}
                            className="h-6 w-6 p-0 hover:bg-slate-100"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={navigateToNextMatch}
                            className="h-6 w-6 p-0 hover:bg-slate-100"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleCloseSearch}
                        className="h-6 w-6 p-0 text-slate-600 hover:text-black hover:bg-slate-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-slate-600 border border-black/20 hover:border-black/40 ${showSearch ? 'bg-deep-blue text-white border-deep-blue' : ''}`}
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Notifications */}
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

        {/* User Info - Hidden on small screens when search is active */}
        <div className={`text-right ${showSearch ? 'hidden md:block' : 'block'}`}>
          <p className="text-sm font-medium text-slate-900 hidden sm:block">
            {user?.name}
          </p>
          <Badge variant={getRoleBadgeVariant(user?.role)} className="text-xs mb-1 hidden sm:inline-flex">
            {getRoleDisplayName(user?.role)}
          </Badge>
          <p className="text-xs text-slate-600 hidden lg:block">Last updated: {formatLastUpdated(lastUpdated)}</p>
        </div>

        {/* User Avatar Dropdown */}
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
