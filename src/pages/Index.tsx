
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading) {
      navigate(isAuthenticated ? '/marketplace' : '/login');
    }
  }, [navigate, isAuthenticated, isLoading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 relative animate-pulse mb-4">
        <div className="absolute inset-0 bg-teal-500 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          JOB+
        </div>
      </div>
      <h1 className="text-xl font-semibold text-gray-900">
        <span className="text-teal-600">Empower</span>Her
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        Connecting Rural Women to Opportunities
      </p>
    </div>
  );
};

export default Index;
