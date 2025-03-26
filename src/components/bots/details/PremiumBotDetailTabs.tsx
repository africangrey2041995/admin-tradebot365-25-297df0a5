
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { toast } from 'sonner';

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
  isAdmin?: boolean;
}

const PremiumBotDetailTabs: React.FC<PremiumBotDetailTabsProps> = ({
  activeTab,
  onTabChange,
  userId,
  botId,
  onRefresh,
  isLoading,
  overviewContent,
  accountsData = [],
  logsData,
  signalSourceLabel = "TB365 ID",
  isAdmin = false
}) => {
  // Prepare export data for the accounts
  const accountsExportData = accountsData.map(account => [
    account.cspAccountName || '',
    account.cspUserEmail || '',
    account.apiName || '',
    account.tradingAccountType || '',
    account.status || '',
    account.tradingAccountBalance || ''
  ]);

  const accountsExportHeaders = [
    'Tên tài khoản',
    'Email',
    'API',
    'Loại tài khoản',
    'Trạng thái',
    'Số dư'
  ];

  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    toast.info(`Editing account: ${account.cspAccountName}`);
  };

  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    toast.info(`Deleting account: ${accountId}`);
  };

  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    toast.info(`Toggling connection for account: ${accountId}`);
  };

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
            {isAdmin ? (
              <>
                <div className="flex justify-end mb-4">
                  <ExportDataDropdown 
                    data={accountsExportData}
                    headers={accountsExportHeaders}
                    fileName={`premium-bot-${botId}-accounts`}
                  />
                </div>
                <HierarchicalAccountsTable 
                  accounts={accountsData}
                  onRefresh={onRefresh}
                  onEdit={handleEditAccount}
                  onDelete={handleDeleteAccount}
                  onToggleConnection={handleToggleConnection}
                />
              </>
            ) : (
              <BotAccountsTable 
                botId={botId} 
                userId={userId} 
                initialData={accountsData}
              />
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
