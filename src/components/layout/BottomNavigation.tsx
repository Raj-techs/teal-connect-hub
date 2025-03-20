
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, BarChart2, MessageSquare, Briefcase, User } from 'lucide-react';

const navItems = [
  { 
    name: 'Marketplace', 
    path: '/marketplace', 
    icon: ShoppingCart 
  },
  { 
    name: 'Opportunities', 
    path: '/opportunities', 
    icon: BarChart2 
  },
  { 
    name: 'AI Chat', 
    path: '/ai-chat', 
    icon: MessageSquare 
  },
  { 
    name: 'Job Listings', 
    path: '/job-listings', 
    icon: Briefcase 
  },
  { 
    name: 'Profile', 
    path: '/profile', 
    icon: User 
  },
];

const BottomNavigation = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-subtle py-2 px-4">
      <nav className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center px-3 py-1 rounded-xl transition-all",
                isActive ? "text-teal-600" : "text-gray-500"
              )}
            >
              <div 
                className={cn(
                  "relative flex items-center justify-center w-6 h-6",
                  isActive && "text-teal-600"
                )}
              >
                <Icon size={20} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-600 rounded-full"></span>
                )}
              </div>
              <span className={cn(
                "text-xs mt-1 font-medium",
                isActive ? "text-teal-600" : "text-gray-500"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavigation;
