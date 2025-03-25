
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import TabContentWrapper from './tabs/TabContentWrapper';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';
import { useQueryClient } from '@tanstack/react-query';
import { accountsQueryKeys } from '@/hooks/accounts/useAccountsQuery';

interface UserBotDetailTabsProps {
  userId: string;
  botId: string;
  accountsData?: Account[];
  logsData?: CoinstratSignal[];
  onRefresh?: () => void;
  isLoading?: boolean;
  signalSourceLabel?: string;
  botType?: 'premium' | 'prop' | 'user';
}

const UserBotDetailTabs: React.FC<UserBotDetailTabsProps> = ({
  userId,
  botId,
  accountsData,
  logsData,
  onRefresh,
  isLoading = false,
  signalSourceLabel = "TradingView ID",
  botType = 'user'
}) => {
  const [activeTab, setActiveTab] = useState("accounts");
  const [refreshLoading, setRefreshLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Sync refreshLoading with parent isLoading
    setRefreshLoading(isLoading);
    
    // Safety timeout to ensure refreshLoading is eventually reset
    if (isLoading) {
      const timer = setTimeout(() => {
        setRefreshLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  console.log(`UserBotDetailTabs - userId: ${userId}, botId: ${botId}, isLoading: ${isLoading}, refreshLoading: ${refreshLoading}`);
  console.log(`UserBotDetailTabs - accountsData length: ${accountsData?.length || 0}, logsData length: ${logsData?.length || 0}`);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // When there's an onRefresh handler provided, call it when changing tabs
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleRefresh = () => {
    console.log("UserBotDetailTabs - handleRefresh called, setting refreshLoading to true");
    setRefreshLoading(true);
    
    // Invalidate React Query cache for this bot's accounts
    queryClient.invalidateQueries({ queryKey: accountsQueryKeys.byBot(botId) });
    
    if (onRefresh) {
      onRefresh();
    }
    
    // In case the parent doesn't reset the loading state
    setTimeout(() => {
      console.log("UserBotDetailTabs - Resetting refreshLoading to false after timeout");
      setRefreshLoading(false);
    }, 1500);
  };

  return (
    <TabContentWrapper 
      title="Quản lý Bot"
      description="Thông tin về tài khoản, tín hiệu và lịch sử xử lý"
      onRefresh={handleRefresh}
      refreshLoading={refreshLoading}
    >
      <Tabs defaultValue="accounts" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="accounts">Tài khoản kết nối</TabsTrigger>
          <TabsTrigger value="tradingview-logs">TradingView Logs</TabsTrigger>
          <TabsTrigger value="coinstrat-logs">Coinstrat Pro Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts">
          <BotAccountsTable 
            botId={botId} 
            userId={userId} 
            initialData={accountsData} 
            refreshTrigger={refreshLoading}
          />
        </TabsContent>
        
        <TabsContent value="tradingview-logs">
          <TradingViewLogs 
            botId={botId} 
            userId={userId}
            refreshTrigger={refreshLoading}
            botType={botType}
          />
        </TabsContent>
        
        <TabsContent value="coinstrat-logs">
          <CoinstratLogs 
            botId={botId} 
            userId={userId} 
            initialData={logsData}
            signalSourceLabel={signalSourceLabel}
            refreshTrigger={refreshLoading}
            botType={botType}
          />
        </TabsContent>
      </Tabs>
    </TabContentWrapper>
  );
};

export default UserBotDetailTabs;
