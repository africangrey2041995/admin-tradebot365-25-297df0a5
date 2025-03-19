
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ClerkProvider } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Bots from "./pages/Bots";
import BotProfile from "./pages/BotProfile";
import Accounts from "./pages/Accounts";
import AccountProfile from "./pages/AccountProfile";
import PremiumBots from "./pages/PremiumBots";
import PremiumBotDetail from "./pages/PremiumBotDetail";
import IntegratedPremiumBots from "./pages/IntegratedPremiumBots";
import IntegratedPremiumBotDetail from "./pages/IntegratedPremiumBotDetail";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Fixed Clerk publishable key - this is your test key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Y291cmFnZW91cy1weXRob24tNjAuY2xlcmsuYWNjb3VudHMuZGV2JA";

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      elements: {
        formButtonPrimary: 'bg-[#04ce91] hover:bg-[#03b17d]',
        card: 'bg-[#111111]',
        formInput: 'bg-[#1a1a1a] text-white',
        footerActionLink: 'text-[#04ce91] hover:text-[#03b17d]',
        headerTitle: 'text-white',
        headerSubtitle: 'text-zinc-400',
        socialButtonsBlockButton: 'border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-white',
        dividerLine: 'bg-zinc-700',
        dividerText: 'text-zinc-500',
        formFieldLabel: 'text-zinc-400',
        identityPreviewText: 'text-white',
        identityPreviewEditButton: 'text-[#04ce91]'
      },
      layout: {
        showOptionalFields: false,
        socialButtonsVariant: 'iconButton',
      }
    }}
  >
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
              <Route path="/integrated-premium-bots" element={<IntegratedPremiumBots />} />
              <Route path="/integrated-premium-bots/:botId" element={<IntegratedPremiumBotDetail />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/accounts/:accountId" element={<AccountProfile />} />
              
              {/* Auth routes */}
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              
              {/* Not found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
