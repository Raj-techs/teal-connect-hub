
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface OpportunityCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  onClick?: (id: string) => void;
}

const OpportunityCard = ({ id, title, description, image, onClick }: OpportunityCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  
  return (
    <div 
      className="rounded-xl bg-white shadow-subtle overflow-hidden transition-all duration-300 hover:shadow-card animate-slide-up"
      style={{ animationDelay: `${parseInt(id) * 50}ms`, animationFillMode: 'backwards' }}
    >
      <button 
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
        onClick={handleClick}
      >
        <div className="flex items-center p-3">
          <div className="relative rounded-lg overflow-hidden w-16 h-16 flex-shrink-0">
            <div className={cn(
              "absolute inset-0 bg-gray-200",
              !imageLoaded && "image-loading"
            )}></div>
            <img
              src={image}
              alt={title}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="ml-4 flex-1">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-1 mt-1">{description}</p>
          </div>
          
          <ChevronRight size={18} className="text-gray-400 flex-shrink-0 ml-2" />
        </div>
      </button>
    </div>
  );
};

export default OpportunityCard;
