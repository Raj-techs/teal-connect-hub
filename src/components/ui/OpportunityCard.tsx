
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface OpportunityCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  onClick?: (id: string) => void;
}

const OpportunityCard = ({ id, title, description, image, onClick }: OpportunityCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  
  const handleImageError = () => {
    console.error(`Failed to load image: ${image}`);
    setImageError(true);
    setImageLoaded(true); // Mark as loaded to remove loading state
  };
  
  return (
    <div 
      className="rounded-xl bg-white dark:bg-gray-800 shadow-subtle overflow-hidden transition-all duration-300 hover:shadow-card animate-slide-up"
      style={{ animationDelay: `${parseInt(id) * 50}ms`, animationFillMode: 'backwards' }}
    >
      <button 
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
        onClick={handleClick}
      >
        <div className="flex items-center p-3">
          <div className="relative rounded-lg overflow-hidden w-16 h-16 flex-shrink-0">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-700" />
            )}
            
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <span className="text-xs text-gray-400">No img</span>
              </div>
            ) : (
              <img
                src={image}
                alt={title}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-500",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
              />
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">{description}</p>
          </div>
          
          <ChevronRight size={18} className="text-gray-400 flex-shrink-0 ml-2" />
        </div>
      </button>
    </div>
  );
};

export default OpportunityCard;
