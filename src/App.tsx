import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/providers/theme-provider';
import { ClerkProvider } from '@clerk/clerk-react';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminUserDetail from './pages/admin/UserDetail';
import AdminBots from './pages/admin/Bots';
import AdminBotErrors from './pages/admin/BotErrors';
import AdminBotErrorDetail from './pages/admin/BotErrorDetail';
import AdminPremiumBots from './pages/admin/PremiumBots';
import AdminPremiumBotDetail from './pages/admin/PremiumBotDetail';
import AdminPropBots from './pages/admin/PropBots';
import AdminPropBotDetail from './pages/admin/PropBotDetail';
import AdminUserBots from './pages/admin/UserBots';
import AdminUserBotDetail from './pages/admin/UserBotDetail';
import AdminManagement from './pages/admin/AdminManagement';
import AdminSystemLogs from './pages/admin/Logs';
import AdminNotifications from './pages/admin/Notifications';
import AdminEmail from './pages/admin/Email';
import AdminDatabase from './pages/admin/Database';
import AdminSettings from './pages/admin/Settings';
import AdminPackages from './pages/admin/Packages';

// User Pages
import Index from './pages/Index';
import Bots from './pages/Bots';
import BotProfile from './pages/BotProfile';
import PremiumBots from './pages/PremiumBots';
import PremiumBotDetail from './pages/PremiumBotDetail';
import IntegratedPremiumBots from './pages/IntegratedPremiumBots';
import IntegratedPremiumBotDetail from './pages/IntegratedPremiumBotDetail';
import PropTradingBots from './pages/PropTradingBots';
import PropTradingBotDetail from './pages/PropTradingBotDetail';
import IntegratedPropBots from './pages/IntegratedPropBots';
import IntegratedPropBotDetail from './pages/IntegratedPropBotDetail';
import Accounts from './pages/Accounts';
import AccountProfile from './pages/AccountProfile';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import Signals from './pages/Signals';
import Connections from './pages/Connections';
import BotErrors from './pages/BotErrors';

// Auth Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Other Pages
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

// Use a fake API key for development
// In production, use environment variables
const clerkPubKey = 'pk_test_Y2VudHJhbC1nb3BoZXItNjkuY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={clerkPubKey}>
          <ThemeProvider defaultTheme="dark" storageKey="tradebot-theme">
            <Router>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="users/:userId" element={<AdminUserDetail />} />
                  <Route path="bots" element={<AdminBots />} />
                  <Route path="bot-errors" element={<AdminBotErrors />} />
                  <Route path="bot-errors/:errorId" element={<AdminBotErrorDetail />} />
                  <Route path="premium-bots" element={<AdminPremiumBots />} />
                  <Route path="premium-bots/:botId" element={<AdminPremiumBotDetail />} />
                  <Route path="prop-bots" element={<AdminPropBots />} />
                  <Route path="prop-bots/:botId" element={<AdminPropBotDetail />} />
                  <Route path="user-bots" element={<AdminUserBots />} />
                  <Route path="user-bots/:botId" element={<AdminUserBotDetail />} />
                  <Route path="admin-management" element={<AdminManagement />} />
                  <Route path="logs" element={<AdminSystemLogs />} />
                  <Route path="notifications" element={<AdminNotifications />} />
                  <Route path="email" element={<AdminEmail />} />
                  <Route path="database" element={<AdminDatabase />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="packages" element={<AdminPackages />} />
                </Route>

                {/* User Routes */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Index />} />
                  <Route path="bots" element={<Bots />} />
                  <Route path="bots/:botId" element={<BotProfile />} />
                  <Route path="premium-bots" element={<PremiumBots />} />
                  <Route path="premium-bots/:botId" element={<PremiumBotDetail />} />
                  <Route path="integrated-premium-bots" element={<IntegratedPremiumBots />} />
                  <Route path="integrated-premium-bots/:botId" element={<IntegratedPremiumBotDetail />} />
                  <Route path="prop-trading-bots" element={<PropTradingBots />} />
                  <Route path="prop-trading-bots/:botId" element={<PropTradingBotDetail />} />
                  <Route path="integrated-prop-bots" element={<IntegratedPropBots />} />
                  <Route path="integrated-prop-bots/:botId" element={<IntegratedPropBotDetail />} />
                  <Route path="accounts" element={<Accounts />} />
                  <Route path="accounts/:accountId" element={<AccountProfile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="signals" element={<Signals />} />
                  <Route path="connections" element={<Connections />} />
                  <Route path="bot-errors" element={<BotErrors />} />
                  <Route path="bot-errors/:errorId" element={<BotErrors />} />
                </Route>
                
                {/* Auth Routes */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
