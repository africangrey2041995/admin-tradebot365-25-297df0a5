
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { accountsQueryKeys } from '@/hooks/accounts/useAccountsQuery';
import UserHierarchicalAccountsTable from '@/components/bots/accounts/UserHierarchicalAccountsTable';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { toast } from 'sonner';

interface PropTradingBotTabsProps {
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

const PropTradingBotTabs: React.FC<PropTradingBotTabsProps> = ({
  activeTab,
  setActiveTab,
  userId,
  botId,
  refreshLoading,
  accounts = [],
  logs,
  overviewContent,
  refreshTabData
}) => {
  const queryClient = useQueryClient();

  // Use the accounts hook to manage connected accounts
  const { 
    accounts: botAccounts,
    loading: accountsLoading,
    error: accountsError,
    handleRefresh: refreshAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus
  } = useBotAccounts(botId, userId, accounts, 'prop');

  // Function to handle data refresh with React Query
  const handleRefresh = () => {
    // Invalidate React Query cache for this bot's accounts
    queryClient.invalidateQueries({
      queryKey: accountsQueryKeys.byBot(botId)
    });

    // Refresh accounts using the hook
    refreshAccounts();

    // Also call the provided refresh function
    refreshTabData();
  };

  // Wrapper functions to handle account management operations
  const handleAddAccount = (account: Account) => {
    addAccount(account);
    toast.success('Tài khoản đã được thêm thành công');
  };

  const handleUpdateAccount = (account: Account) => {
    updateAccount(account);
    toast.success('Tài khoản đã được cập nhật thành công');
  };

  const handleDeleteAccount = (accountId: string) => {
    deleteAccount(accountId);
    toast.success('Tài khoản đã được xóa thành công');
  };

  const handleToggleStatus = (accountId: string) => {
    toggleAccountStatus(accountId);
    toast.success('Trạng thái tài khoản đã được cập nhật');
  };

  return <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 p-0 h-auto rounded-none">
        <TabsTrigger value="overview" className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6">
          Tổng Quan
        </TabsTrigger>
        <TabsTrigger value="accounts" className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6">Tài Khoản Kết Nối</TabsTrigger>
        <TabsTrigger value="logs" className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6">
          Coinstrat Pro Logs
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="accounts">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
            <CardTitle className="text-lg font-medium">Tài Khoản Kết Nối</CardTitle>
            <CardDescription>
              Quản lý các tài khoản được kết nối với Prop Trading Bot
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <UserHierarchicalAccountsTable 
              accounts={botAccounts}
              isLoading={accountsLoading || refreshLoading}
              error={accountsError}
              onRefresh={handleRefresh}
              onAddAccount={handleAddAccount}
              onEditAccount={handleUpdateAccount}
              onDeleteAccount={handleDeleteAccount}
              onToggleStatus={handleToggleStatus}
              botType="prop"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="logs">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
            <CardTitle className="text-lg font-medium">Coinstrat Pro Logs</CardTitle>
            <CardDescription>
              Xem lịch sử các tín hiệu đã được xử lý bởi Prop Trading Bot
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <CoinstratLogs botId={botId} userId={userId} initialData={logs} signalSourceLabel="TB365 ID" refreshTrigger={refreshLoading} botType="prop" isLoading={refreshLoading} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>;
};

export default PropTradingBotTabs;
