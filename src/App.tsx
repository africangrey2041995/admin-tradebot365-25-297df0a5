
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Bots from "./pages/Bots";
import BotProfile from "./pages/BotProfile";
import Accounts from "./pages/Accounts";
import AccountProfile from "./pages/AccountProfile";
import PremiumBots from "./pages/PremiumBots";
import PremiumBotDetail from "./pages/PremiumBotDetail";
import IntegratedPremiumBots from "./pages/IntegratedPremiumBots";
import IntegratedPremiumBotDetail from "./pages/IntegratedPremiumBotDetail";
import PropTradingBots from "./pages/PropTradingBots";
import IntegratedPropBots from "./pages/IntegratedPropBots";
import IntegratedPropBotDetail from "./pages/IntegratedPropBotDetail";
import PropTradingBotDetail from "./pages/PropTradingBotDetail";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import BotMonitoringPage from "./pages/BotMonitoringPage";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminUserDetail from "./pages/admin/UserDetail";
import AdminBots from "./pages/admin/Bots";
import AdminDatabase from "./pages/admin/Database";
import AdminLogs from "./pages/admin/Logs";
import AdminNotifications from "./pages/admin/Notifications";
import AdminEmail from "./pages/admin/Email";
import AdminSettings from "./pages/admin/Settings";
import AdminManagement from "./pages/admin/AdminManagement";
import AdminPremiumBots from "./pages/admin/PremiumBots";
import AdminPremiumBotDetail from "./pages/admin/PremiumBotDetail";
import AdminPropBots from "./pages/admin/PropBots";
import AdminPropBotDetail from "./pages/admin/PropBotDetail";
import AdminUserBots from "./pages/admin/UserBots";
import AdminUserBotDetail from "./pages/admin/UserBotDetail";
import AdminPackages from "./pages/admin/Packages";
import AdminBotMonitoringPage from "./pages/admin/BotMonitoringPage";
import Subscriptions from "./pages/admin/Subscriptions";

// Fixed Clerk publishable key - this is your test key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Y291cmFnZW91cy1weXRob24tNjAuY2xlcmsuYWNjb3VudHMuZGV2JA";

const queryClient = new QueryClient();

const App = () => {
  console.log("[App] Initializing with PUBLISHABLE_KEY:", PUBLISHABLE_KEY);
  
  return (
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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
                  <Route path="/prop-trading-bots" element={<PropTradingBots />} />
                  <Route path="/integrated-prop-bots" element={<IntegratedPropBots />} />
                  <Route path="/integrated-prop-bots/:botId" element={<IntegratedPropBotDetail />} />
                  <Route path="/prop-trading-bots/:botId" element={<PropTradingBotDetail />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/accounts/:accountId" element={<AccountProfile />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* User Bot Monitoring page route */}
                  <Route path="/bot-monitoring" element={<BotMonitoringPage />} />
                  
                  {/* Auth routes */}
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="users/:userId" element={<AdminUserDetail />} />
                    <Route path="bots" element={<AdminBots />} />
                    <Route path="bot-monitoring" element={<AdminBotMonitoringPage />} />
                    <Route path="premium-bots" element={<AdminPremiumBots />} />
                    <Route path="premium-bots/:botId" element={<AdminPremiumBotDetail />} />
                    <Route path="prop-bots" element={<AdminPropBots />} />
                    <Route path="prop-bots/:botId" element={<AdminPropBotDetail />} />
                    <Route path="user-bots" element={<AdminUserBots />} />
                    <Route path="user-bots/:botId" element={<AdminUserBotDetail />} />
                    <Route path="packages" element={<AdminPackages />} />
                    <Route path="subscriptions" element={<Subscriptions />} />
                    <Route path="database" element={<AdminDatabase />} />
                    <Route path="logs" element={<AdminLogs />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                    <Route path="email" element={<AdminEmail />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="admin-management" element={<AdminManagement />} />
                  </Route>
                  
                  {/* Not found route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default App;
