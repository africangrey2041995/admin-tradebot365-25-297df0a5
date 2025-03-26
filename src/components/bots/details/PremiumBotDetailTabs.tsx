
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';

interface PremiumBotDetailTabsProps {
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

const PremiumBotDetailTabs: React.FC<PremiumBotDetailTabsProps> = ({
  activeTab,
  onTabChange,
  userId,
  botId,
  onRefresh,
  isLoading,
  overviewContent,
  accountsData,
  logsData,
  signalSourceLabel = "TB365 ID"
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="connected-accounts">Tài khoản kết nối</TabsTrigger>
        <TabsTrigger value="coinstrat-logs">Premium Bot Logs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <Card>
          <CardHeader>
            <CardTitle>Tài khoản kết nối</CardTitle>
            <CardDescription>Quản lý các tài khoản được kết nối với Premium Bot</CardDescription>
          </CardHeader>
          <CardContent>
            {accountsData && accountsData.length > 0 ? (
              <HierarchicalAccountsTable 
                accounts={accountsData}
                onRefresh={onRefresh}
              />
            ) : (
              <div className="text-center py-10 text-gray-500">
                Không có tài khoản nào được kết nối với bot này
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <Card>
          <CardHeader>
            <CardTitle>Premium Bot Logs</CardTitle>
            <CardDescription>Xem lịch sử các tín hiệu đã được xử lý bởi Premium Bot</CardDescription>
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

export default PremiumBotDetailTabs;
