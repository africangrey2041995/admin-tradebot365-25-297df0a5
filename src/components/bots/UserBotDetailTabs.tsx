
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';
import BotOverviewCard from './BotOverviewCard';
import UserHierarchicalAccountsTable from './accounts/UserHierarchicalAccountsTable';
import UserLogsTable from './logs/UserLogsTable';

interface UserBotDetailTabsProps {
  botId: string;
  userId: string;
  onRefresh: () => void;
  isLoading: boolean;
  accountsData?: Account[];
  logsData?: CoinstratSignal[];
  signalSourceLabel?: string;
  botType?: 'premium' | 'prop' | 'user';
  isAdminView?: boolean;
  onAddAccount?: (account: Account) => void;
}

const UserBotDetailTabs: React.FC<UserBotDetailTabsProps> = ({
  botId,
  userId,
  onRefresh,
  isLoading,
  accountsData = [],
  logsData = [],
  signalSourceLabel = "TradingView ID",
  botType = 'user',
  isAdminView = false,
  onAddAccount
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
        <TabsTrigger value="logs">Lịch sử giao dịch</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <BotOverviewCard botId={botId} />
      </TabsContent>

      <TabsContent value="accounts">
        <UserHierarchicalAccountsTable 
          accounts={accountsData}
          isLoading={isLoading}
          onRefresh={onRefresh}
          onAddAccount={onAddAccount}
          onEditAccount={(account: Account) => console.log('Edit account', account)}
          onDeleteAccount={(accountId: string) => console.log('Delete account', accountId)}
          onToggleStatus={(accountId: string) => console.log('Toggle status', accountId)}
          botType={botType}
        />
      </TabsContent>

      <TabsContent value="logs">
        <UserLogsTable 
          logs={logsData}
          isLoading={isLoading}
          onRefresh={onRefresh}
          signalSourceLabel={signalSourceLabel}
        />
      </TabsContent>
    </Tabs>
  );
};

export default UserBotDetailTabs;
