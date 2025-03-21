
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import DrawerMenu from './DrawerMenu';
import { Menu, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  
  const handleMyOrdersClick = () => {
    navigate('/my-orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 page-transition">
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-subtle">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={openDrawer}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-ring"
              aria-label="Menu"
            >
              <Menu size={22} className="text-gray-700 dark:text-gray-200" />
            </button>
            
            <div className="ml-2 flex items-center">
              <div className="w-7 h-7 mr-2 relative">
                <div className="absolute inset-0 bg-teal-500 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                  E+
                </div>
              </div>
              <h1 className="text-lg font-bold text-teal-600 dark:text-teal-400">EmpowerHer</h1>
            </div>
          </div>
          
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all dark:text-white"
            />
          </div>
          
          <button
            onClick={handleMyOrdersClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-ring relative"
            aria-label="My Orders"
          >
            <ShoppingBag size={22} className="text-gray-700 dark:text-gray-200" />
            <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
        </div>
      </header>
      
      <main className="pb-20">
        <Outlet />
      </main>
      
      <BottomNavigation />
      <DrawerMenu isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
};

export default AppLayout;
