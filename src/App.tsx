
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<Index />} />
            <Route path="/bots" element={<Bots />} />
            <Route path="/bots/:botId" element={<BotProfile />} />
            <Route path="/premium-bots" element={<PremiumBots />} />
            <Route path="/premium-bots/:botId" element={<PremiumBotDetail />} />
            <Route path="/prop-trading-bots/:botId" element={<PropTradingBotDetail />} />
            <Route path="/integrated-premium-bots" element={<IntegratedPremiumBots />} />
            <Route path="/integrated-premium-bots/:botId" element={<IntegratedPremiumBotDetail />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/accounts/:accountId" element={<AccountProfile />} />
            
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
