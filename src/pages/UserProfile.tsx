
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { User, Shield, CreditCard } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProfileSection from "@/components/profile/ProfileSection";
import PersonalDataForm from "@/components/profile/PersonalDataForm";
import SecuritySettings from "@/components/profile/SecuritySettings";
import BillingSettings from "@/components/profile/BillingSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profileTabs = [
  { id: "personal", label: "Thông tin cá nhân", icon: <User className="h-4 w-4" /> },
  { id: "security", label: "Bảo mật", icon: <Shield className="h-4 w-4" /> },
  { id: "billing", label: "Thanh toán", icon: <CreditCard className="h-4 w-4" /> }
];

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");

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
            <h1 className="text-3xl font-bold tracking-tight">Hồ sơ tài khoản</h1>
            <p className="text-muted-foreground mt-1">
              Quản lý thông tin cá nhân, bảo mật và thanh toán của bạn.
            </p>
          </div>

          <Tabs 
            defaultValue="personal" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3 max-w-md">
              {profileTabs.map((tab) => (
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

            <TabsContent value="personal" className="space-y-6">
              <ProfileSection
                title="Thông tin cá nhân"
                description="Quản lý thông tin cá nhân của bạn"
                icon={<User className="h-5 w-5" />}
              >
                <PersonalDataForm />
              </ProfileSection>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <ProfileSection
                title="Bảo mật"
                description="Quản lý mật khẩu và bảo mật tài khoản"
                icon={<Shield className="h-5 w-5" />}
              >
                <SecuritySettings />
              </ProfileSection>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <ProfileSection
                title="Thanh toán & Đăng ký"
                description="Quản lý gói đăng ký và phương thức thanh toán"
                icon={<CreditCard className="h-5 w-5" />}
              >
                <BillingSettings />
              </ProfileSection>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default UserProfile;
