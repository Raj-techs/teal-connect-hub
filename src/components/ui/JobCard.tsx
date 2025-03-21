
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface JobCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  badge?: string;
  onClick?: (id: string) => void;
}

const JobCard = ({ id, title, location, image, badge, onClick }: JobCardProps) => {
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
      className="rounded-lg bg-white dark:bg-gray-800 shadow-card overflow-hidden transition-all duration-300 hover:shadow-elevated focus-within:ring-2 focus-within:ring-teal-500 animate-slide-up"
      style={{ animationDelay: `${parseInt(id) * 50}ms`, animationFillMode: 'backwards' }}
    >
      <button 
        className="w-full text-left focus:outline-none"
        onClick={handleClick}
      >
        <div className="relative aspect-[1/1] overflow-hidden">
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-700" />
          )}
          
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <span className="text-sm text-gray-400">Image unavailable</span>
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
          
          {badge && (
            <div className="absolute top-1 right-1 bg-teal-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
              {badge}
            </div>
          )}
        </div>
        
        <div className="p-2">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-1">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{location}</p>
        </div>
      </button>
    </div>
  );
};

export default JobCard;
