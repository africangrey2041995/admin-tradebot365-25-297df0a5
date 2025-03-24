
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';

interface PropBotDetailTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  userId: string;
  botId: string;
  refreshLoading: boolean;
  accounts?: Account[];
  logs?: CoinstratSignal[];
  overviewContent: React.ReactNode;
  refreshTabData: () => void;
}

const PropBotDetailTabs: React.FC<PropBotDetailTabsProps> = ({
  activeTab,
  setActiveTab,
  userId,
  botId,
  refreshLoading,
  accounts,
  logs,
  overviewContent,
  refreshTabData
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 p-0 h-auto rounded-none">
        <TabsTrigger 
          value="overview" 
          className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6"
        >
          Tổng Quan
        </TabsTrigger>
        <TabsTrigger 
          value="accounts" 
          className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6"
        >
          Tài Khoản
        </TabsTrigger>
        <TabsTrigger 
          value="logs" 
          className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6"
        >
          Coinstrat Pro Logs
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="accounts" className="mt-6">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
            <CardTitle className="text-lg font-medium">Tài Khoản Kết Nối</CardTitle>
            <CardDescription>
              Quản lý các tài khoản được kết nối với Prop Trading Bot
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <BotAccountsTable 
              botId={botId} 
              userId={userId} 
              initialData={accounts}
              botType="prop"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="logs" className="mt-6">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
            <CardTitle className="text-lg font-medium">Coinstrat Pro Logs</CardTitle>
            <CardDescription>
              Xem lịch sử các tín hiệu đã được xử lý bởi Prop Trading Bot
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <CoinstratLogs 
              botId={botId} 
              userId={userId}
              initialData={logs}
              signalSourceLabel="TB365 ID"
              botType="prop"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PropBotDetailTabs;
