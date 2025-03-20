
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SplashScreen = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500); // Total animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500",
        animationComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-6 relative">
          <div className="absolute inset-0 bg-teal-500 rounded-full animate-pulse-subtle" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
            JOB+
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
          <span className="text-teal-600">Connect</span>Hub
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
