
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Bots from './pages/Bots';
import BotProfile from './pages/BotProfile';
import Accounts from './pages/Accounts';
import AccountProfile from './pages/AccountProfile';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Signals from './pages/Signals';
import Connections from './pages/Connections';
import PremiumBots from './pages/PremiumBots';
import PremiumBotDetail from './pages/PremiumBotDetail';
import PropTradingBots from './pages/PropTradingBots';
import PropTradingBotDetail from './pages/PropTradingBotDetail';
import IntegratedPremiumBots from './pages/IntegratedPremiumBots';
import IntegratedPremiumBotDetail from './pages/IntegratedPremiumBotDetail';
import IntegratedPropBots from './pages/IntegratedPropBots';
import IntegratedPropBotDetail from './pages/IntegratedPropBotDetail';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/bots/:id" element={<BotProfile />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/:id" element={<AccountProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/signals" element={<Signals />} />
        <Route path="/premium-bots" element={<PremiumBots />} />
        <Route path="/premium-bots/:id" element={<PremiumBotDetail />} />
        <Route path="/prop-trading" element={<PropTradingBots />} />
        <Route path="/prop-trading/:id" element={<PropTradingBotDetail />} />
        <Route path="/integrated-premium-bots" element={<IntegratedPremiumBots />} />
        <Route path="/integrated-premium-bots/:id" element={<IntegratedPremiumBotDetail />} />
        <Route path="/integrated-prop-bots" element={<IntegratedPropBots />} />
        <Route path="/integrated-prop-bots/:id" element={<IntegratedPropBotDetail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
