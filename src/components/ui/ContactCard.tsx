
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface ContactCardProps {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  onClick?: (id: string) => void;
}

const ContactCard = ({ id, name, role, avatar, onClick }: ContactCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  
  return (
    <div 
      className="bg-white animate-slide-up"
      style={{ animationDelay: `${parseInt(id) * 50}ms`, animationFillMode: 'backwards' }}
    >
      <button 
        className="w-full text-left focus:outline-none focus:bg-gray-50 py-3 px-4"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium overflow-hidden flex-shrink-0">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              name.charAt(0)
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
          
          <ChevronRight size={18} className="text-gray-400 flex-shrink-0" />
        </div>
      </button>
    </div>
  );
};

export default ContactCard;
