
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Bots from "./pages/Bots";
import Accounts from "./pages/Accounts";
import AccountProfile from "./pages/AccountProfile";
import Connections from "./pages/Connections";
import Signals from "./pages/Signals";
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
            <Route path="/" element={<Index />} />
            <Route path="/bots" element={<Bots />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/accounts/:accountId" element={<AccountProfile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/signals" element={<Signals />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
