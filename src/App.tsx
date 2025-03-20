
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import SplashScreen from "@/components/SplashScreen";
import LoginPage from "@/components/auth/LoginPage";
import SignupPage from "@/components/auth/SignupPage";
import AppLayout from "@/components/layout/AppLayout";
import Marketplace from "@/pages/Marketplace";
import Opportunities from "@/pages/Opportunities";
import AIChat from "@/pages/AIChat";
import JobListings from "@/pages/JobListings";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <SplashScreen />
          <Toaster />
          <Sonner />
          
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/" element={<AppLayout />}>
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/job-listings" element={<JobListings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
