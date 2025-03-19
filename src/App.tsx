
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Bots from "./pages/Bots";
import BotProfile from "./pages/BotProfile";
import Accounts from "./pages/Accounts";
import AccountProfile from "./pages/AccountProfile";
import PremiumBots from "./pages/PremiumBots";
import PremiumBotDetail from "./pages/PremiumBotDetail";
import IntegratedPremiumBots from "./pages/IntegratedPremiumBots";
import IntegratedPremiumBotDetail from "./pages/IntegratedPremiumBotDetail";
import PropTradingBotDetail from "./pages/PropTradingBotDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SSOCallback from "./pages/SSOCallback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) {
    return <div className="h-screen w-full flex items-center justify-center bg-zinc-900">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Authentication routes */}
            <Route path="/sign-in" element={
              <SignedOut>
                <SignIn />
              </SignedOut>
            } />
            <Route path="/sign-up" element={
              <SignedOut>
                <SignUp />
              </SignedOut>
            } />
            <Route path="/sso-callback" element={<SSOCallback />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/bots" element={
              <ProtectedRoute>
                <Bots />
              </ProtectedRoute>
            } />
            <Route path="/bots/:botId" element={
              <ProtectedRoute>
                <BotProfile />
              </ProtectedRoute>
            } />
            <Route path="/premium-bots" element={
              <ProtectedRoute>
                <PremiumBots />
              </ProtectedRoute>
            } />
            <Route path="/premium-bots/:botId" element={
              <ProtectedRoute>
                <PremiumBotDetail />
              </ProtectedRoute>
            } />
            <Route path="/prop-trading-bots/:botId" element={
              <ProtectedRoute>
                <PropTradingBotDetail />
              </ProtectedRoute>
            } />
            <Route path="/integrated-premium-bots" element={
              <ProtectedRoute>
                <IntegratedPremiumBots />
              </ProtectedRoute>
            } />
            <Route path="/integrated-premium-bots/:botId" element={
              <ProtectedRoute>
                <IntegratedPremiumBotDetail />
              </ProtectedRoute>
            } />
            <Route path="/accounts" element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            } />
            <Route path="/accounts/:accountId" element={
              <ProtectedRoute>
                <AccountProfile />
              </ProtectedRoute>
            } />
            
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
