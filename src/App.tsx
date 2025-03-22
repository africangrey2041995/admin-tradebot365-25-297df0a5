
import { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AuthProvider } from "@/context/auth-context";
import { SocketProvider } from "@/context/socket-context";
import { AdminLayout } from "@/components/layout/AdminLayout";
import DashboardPage from "@/pages/admin/Dashboard";
import UsersPage from "@/pages/admin/Users";
import UserBotsPage from "@/pages/admin/UserBots";
import PremiumBotsPage from "@/pages/admin/PremiumBots";
import PropBotsPage from "@/pages/admin/PropBots";
import UserDetail from "@/pages/admin/UserDetail";
import PremiumBotDetail from "@/pages/admin/PremiumBotDetail";
import PropBotDetail from "@/pages/admin/PropBotDetail";
import SettingsPage from "@/pages/admin/Settings";
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/Register";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import PricingPage from "@/pages/Pricing";
import ContactPage from "@/pages/Contact";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import LegalPage from "@/pages/Legal";
import NotFoundPage from "@/pages/NotFound";
import ProfilePage from "@/pages/Profile";
import BotStorePage from "@/pages/BotStore";
import UserBotsDetailPage from "@/pages/UserBotsDetail";
import AdminPackages from "./pages/admin/Packages";

const App = () => {
  const { toast } = useToast();
  const { pathname } = useLocation();
  
  // Remove useSettings for now since it's causing errors
  // const { settings } = useSettings();

  // useEffect(() => {
  //   if (settings?.debug) {
  //     toast({
  //       title: "Debug Mode Enabled",
  //       description: "Debug mode is enabled in the settings.",
  //     });
  //   }
  // }, [settings?.debug, toast]);

  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/legal",
      element: <LegalPage />,
    },
    {
      path: "/pricing",
      element: <PricingPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/bot-store",
      element: <BotStorePage />,
    },
    {
      path: "/user-bots/:botId",
      element: <UserBotsDetailPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/reset-password",
      element: <ResetPasswordPage />,
    },
    {
      path: "/admin",
      element: (
        <AdminLayout>
          <DashboardPage />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <AdminLayout>
          <DashboardPage />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/users",
      element: (
        <AdminLayout>
          <UsersPage />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/users/:userId",
      element: (
        <AdminLayout>
          <UserDetail />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/user-bots",
      element: (
        <AdminLayout>
          <UserBotsPage />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/user-bots/:botId",
      element: (
        <AdminLayout>
          <UserBotsPage />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/premium-bots",
      element: (
        <AdminLayout>
          <PremiumBotsPage />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/premium-bots/:botId",
      element: (
        <AdminLayout>
          <PremiumBotDetail />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/prop-bots",
      element: (
        <AdminLayout>
          <PropBotsPage />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/prop-bots/:botId",
      element: (
        <AdminLayout>
          <PropBotDetail />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/settings",
      element: (
        <AdminLayout>
          <SettingsPage />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/packages",
      element: (
        <AdminLayout>
          <AdminPackages />
        </AdminLayout>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <SocketProvider>
      <AuthProvider>
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={cn(
              "min-h-screen antialiased",
              "bg-background text-foreground",
              "dark:bg-zinc-900 dark:text-zinc-50"
            )}
          >
            {pathname.startsWith("/admin") ? null : <SiteHeader />}
            <main className="container relative pt-16 pb-20 md:py-24 lg:pb-32">
              {element}
            </main>
            {pathname.startsWith("/admin") ? null : <SiteFooter />}
          </div>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </SocketProvider>
  );
};

export default App;
