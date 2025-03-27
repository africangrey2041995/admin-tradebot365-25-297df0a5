import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { accountsQueryKeys } from '@/hooks/accounts/useAccountsQuery';
import UserHierarchicalAccountsTable from '@/components/bots/accounts/UserHierarchicalAccountsTable';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { toast } from 'sonner';
import SignalTrackingTab from '@/components/bots/signal-tracking/SignalTrackingTab';
import { Button } from '@/components/ui/button';
import { Link2, UserPlus, Webhook } from 'lucide-react';
import { PropBotAccountDialog } from '@/components/bots/accounts/dialogs';
import BotIntegrationInfo from '@/pages/admin/components/BotIntegrationInfo';

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
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  const queryClient = useQueryClient();

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

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: accountsQueryKeys.byBot(botId)
    });

    refreshAccounts();

    refreshTabData();
  };

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

  const handleAddAccountSubmit = (formData: any) => {
    console.log('Adding account:', formData);
    addAccount({
      cspAccountId: `acc-${Date.now()}`,
      ...formData
    } as Account);
    setIsAddAccountDialogOpen(false);
  };

  return <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 p-0 h-auto rounded-none">
        <TabsTrigger value="overview" className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6">
          Tổng Quan
        </TabsTrigger>
        <TabsTrigger value="accounts" className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6">Tài Khoản Kết Nối</TabsTrigger>
        <TabsTrigger value="signal-tracking" className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6">
          Signal Tracking
        </TabsTrigger>
        <TabsTrigger value="integration" className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6">
          <Webhook className="h-4 w-4 mr-1" />
          Tích Hợp TradingView
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="accounts">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
            <div className="flex justify-between items-center w-full">
              <div>
                <CardTitle className="text-lg font-medium">Tài Khoản Kết Nối</CardTitle>
                <CardDescription>
                  Quản lý các tài khoản được kết nối với Prop Trading Bot
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => setIsAddAccountDialogOpen(true)}
              >
                <UserPlus className="h-4 w-4" />
                <span>Thêm Tài Khoản</span>
              </Button>
            </div>
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

        <PropBotAccountDialog
          open={isAddAccountDialogOpen}
          onOpenChange={setIsAddAccountDialogOpen}
          botId={botId}
          onAddAccount={handleAddAccountSubmit}
        />
      </TabsContent>
      
      <TabsContent value="signal-tracking">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
            <CardTitle className="text-lg font-medium">Signal Tracking</CardTitle>
            <CardDescription>
              Theo dõi các tín hiệu giao dịch và trạng thái xử lý
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <SignalTrackingTab
              botId={botId}
              userId={userId}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="integration">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
            <CardTitle className="text-lg font-medium">Tích Hợp TradingView</CardTitle>
            <CardDescription>
              Thông tin tích hợp API của bot này để kết nối với TradingView Alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <BotIntegrationInfo botId={botId} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>;
};

export default PropTradingBotTabs;
