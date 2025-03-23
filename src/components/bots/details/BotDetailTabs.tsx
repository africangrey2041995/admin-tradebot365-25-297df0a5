
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';

interface BotDetailTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  userId: string;
  botId: string;
  onRefresh: () => void;
  isLoading: boolean;
  overviewContent: React.ReactNode;
  accountsData?: Account[];
  logsData?: CoinstratSignal[];
  signalSourceLabel?: string;
}

const BotDetailTabs: React.FC<BotDetailTabsProps> = ({
  activeTab,
  onTabChange,
  userId,
  botId,
  onRefresh,
  isLoading,
  overviewContent,
  accountsData,
  logsData,
  signalSourceLabel = "TradingView ID"
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="connected-accounts">Tài khoản kết nối</TabsTrigger>
        <TabsTrigger value="coinstrat-logs">Coinstrat Pro Logs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <Card>
          <CardHeader>
            <CardTitle>Tài khoản kết nối</CardTitle>
            <CardDescription>Quản lý các tài khoản được kết nối với bot này</CardDescription>
          </CardHeader>
          <CardContent>
            <BotAccountsTable 
              botId={botId} 
              userId={userId} 
              initialData={accountsData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <Card>
          <CardHeader>
            <CardTitle>Coinstrat Pro Logs</CardTitle>
            <CardDescription>Xem lịch sử các tín hiệu đã được xử lý bởi Coinstrat Pro</CardDescription>
          </CardHeader>
          <CardContent>
            <CoinstratLogs 
              botId={botId} 
              userId={userId}
              initialData={logsData}
              signalSourceLabel={signalSourceLabel}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BotDetailTabs;
