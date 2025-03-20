
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import DrawerMenu from './DrawerMenu';
import { Menu } from 'lucide-react';

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 page-transition">
      <header className="sticky top-0 z-30 bg-white shadow-subtle">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={openDrawer}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors focus-ring"
            aria-label="Menu"
          >
            <Menu size={22} className="text-gray-700" />
          </button>
          
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-gray-100 border border-gray-100 rounded-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
            />
          </div>
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
