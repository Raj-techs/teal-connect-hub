
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { X, LogOut, Bike, Package, UserCircle } from 'lucide-react';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const contacts = [
  { id: '1', name: 'Aurora Raja', role: 'Nourisha' },
  { id: '2', name: 'Deepinder Kaur', role: 'Artisan' },
  { id: '3', name: 'Faiza Ali', role: 'Wellness Specialist' },
  { id: '4', name: 'Meena Sharma', role: 'Crafter' },
  { id: '5', name: 'Priya Patel', role: 'Herbal Tea Maker' },
  { id: '6', name: 'Lakshmi Reddy', role: 'Textile Artist' },
];

const DrawerMenu = ({ isOpen, onClose }: DrawerMenuProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleContactClick = (contactId: string) => {
    navigate(`/contact/${contactId}`);
    onClose();
  };
  
  const handleDeliveryClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      <div 
        className={cn(
          "fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 mr-3 relative">
                <div className="absolute inset-0 bg-teal-500 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                  JOB+
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold">ConnectHub</h2>
                <p className="text-xs text-gray-500">Job marketplace</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-ring"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          {user && (
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto">
            {/* Delivery Dashboard Section */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Delivery Dashboard
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleDeliveryClick('/delivery-dashboard')}
                    className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors focus-ring"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <Bike size={20} />
                    </div>
                    <div className="ml-3 text-left">
                      <span className="font-medium text-gray-900">Available Deliveries</span>
                      <p className="text-sm text-gray-500">Find delivery jobs</p>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDeliveryClick('/my-deliveries')}
                    className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors focus-ring"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <Package size={20} />
                    </div>
                    <div className="ml-3 text-left">
                      <span className="font-medium text-gray-900">My Deliveries</span>
                      <p className="text-sm text-gray-500">Track your deliveries</p>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDeliveryClick('/delivery-profile')}
                    className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors focus-ring"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <UserCircle size={20} />
                    </div>
                    <div className="ml-3 text-left">
                      <span className="font-medium text-gray-900">Delivery Profile</span>
                      <p className="text-sm text-gray-500">Manage your profile</p>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Contacts
              </h3>
              <ul className="space-y-2">
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <button
                      onClick={() => handleContactClick(contact.id)}
                      className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors focus-ring"
                    >
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium">
                        {contact.name.charAt(0)}
                      </div>
                      <div className="ml-3 text-left">
                        <span className="font-medium text-gray-900">{contact.name}</span>
                        <p className="text-sm text-gray-500">{contact.role}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors focus-ring"
            >
              <LogOut size={18} className="mr-2" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerMenu;
