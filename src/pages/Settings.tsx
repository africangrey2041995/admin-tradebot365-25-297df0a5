
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Cog, Bell, Palette, Languages, Shield } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSection from "@/components/profile/ProfileSection";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import { useTheme } from "next-themes";

const settingsTabs = [
  { id: "appearance", label: "Giao diện", icon: <Palette className="h-4 w-4" /> },
  { id: "notifications", label: "Thông báo", icon: <Bell className="h-4 w-4" /> },
  { id: "language", label: "Ngôn ngữ", icon: <Languages className="h-4 w-4" /> },
  { id: "privacy", label: "Quyền riêng tư", icon: <Shield className="h-4 w-4" /> }
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, render a simple placeholder to avoid theme flashing
  if (!mounted) {
    return (
      <MainLayout>
        <div className="container py-6 max-w-5xl mx-auto min-h-screen">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-zinc-700 rounded w-48 mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-96 mb-8"></div>
            <div className="h-12 bg-slate-200 dark:bg-zinc-700 rounded mb-8"></div>
            <div className="h-96 bg-slate-200 dark:bg-zinc-700 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="container py-6 max-w-5xl mx-auto"
      >
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
            <p className="text-muted-foreground mt-1">
              Tùy chỉnh ứng dụng Trade Bot 365 theo ý muốn của bạn.
            </p>
          </div>

          <Tabs 
            defaultValue="appearance" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-4 max-w-3xl">
              {settingsTabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2"
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="appearance" className="space-y-6">
              <ProfileSection
                title="Giao diện"
                description="Tùy chỉnh giao diện và hiển thị của ứng dụng"
                icon={<Palette className="h-5 w-5" />}
              >
                <AppearanceSettings />
              </ProfileSection>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <ProfileSection
                title="Thông báo"
                description="Quản lý thông báo và cảnh báo"
                icon={<Bell className="h-5 w-5" />}
              >
                <NotificationSettings />
              </ProfileSection>
            </TabsContent>

            <TabsContent value="language" className="space-y-6">
              <ProfileSection
                title="Ngôn ngữ"
                description="Thay đổi ngôn ngữ và định dạng hiển thị"
                icon={<Languages className="h-5 w-5" />}
              >
                <LanguageSettings />
              </ProfileSection>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <ProfileSection
                title="Quyền riêng tư"
                description="Kiểm soát dữ liệu và quyền riêng tư của bạn"
                icon={<Shield className="h-5 w-5" />}
              >
                <PrivacySettings />
              </ProfileSection>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Settings;
