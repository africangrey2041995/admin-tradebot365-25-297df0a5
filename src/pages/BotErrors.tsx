
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import ErrorSignalsTable from '@/components/bots/error-signals/ErrorSignalsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useErrorSignals } from '@/hooks/useErrorSignals';
import { BotType } from '@/constants/botTypes';

// Use the standardized user ID format
const CURRENT_USER_ID = 'USR-001';

const BotErrors = () => {
  const [activeTab, setActiveTab] = useState<string>("user-bots");
  
  const {
    userBotErrors,
    premiumBotErrors,
    propBotErrors,
    unreadErrors,
    loading,
    error,
    refreshErrorData,
    markAsRead
  } = useErrorSignals(CURRENT_USER_ID);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <MainLayout title="Quản Lý Lỗi Bot">
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Coinstrat Pro Logs - Lỗi Kết Nối</CardTitle>
          <CardDescription>
            Danh sách các lỗi kết nối do Coinstrat Pro trả về, được phân loại theo loại bot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user-bots" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="user-bots" className="text-sm">
                Bot Người Dùng
              </TabsTrigger>
              <TabsTrigger value="premium-bots" className="text-sm">
                Premium Bots
              </TabsTrigger>
              <TabsTrigger value="prop-bots" className="text-sm">
                Prop Trading Bots
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="user-bots">
              <ErrorSignalsTable 
                errorSignals={userBotErrors}
                unreadErrors={unreadErrors}
                onMarkAsRead={markAsRead}
                loading={loading && activeTab === "user-bots"}
                error={error}
                onRefresh={refreshErrorData}
                botType={BotType.USER_BOT}
              />
            </TabsContent>
            
            <TabsContent value="premium-bots">
              <ErrorSignalsTable 
                errorSignals={premiumBotErrors}
                unreadErrors={unreadErrors}
                onMarkAsRead={markAsRead}
                loading={loading && activeTab === "premium-bots"}
                error={error}
                onRefresh={refreshErrorData}
                botType={BotType.PREMIUM_BOT}
              />
            </TabsContent>
            
            <TabsContent value="prop-bots">
              <ErrorSignalsTable 
                errorSignals={propBotErrors}
                unreadErrors={unreadErrors}
                onMarkAsRead={markAsRead}
                loading={loading && activeTab === "prop-bots"}
                error={error}
                onRefresh={refreshErrorData}
                botType={BotType.PROP_BOT}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default BotErrors;
