
import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import TabContentWrapper from './tabs/TabContentWrapper';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';
import { useQueryClient } from '@tanstack/react-query';
import { accountsQueryKeys } from '@/hooks/accounts/useAccountsQuery';
import { useTradingViewLogs } from './trading-view-logs/useTradingViewLogs';
import { useCoinstratLogs } from './coinstrat-logs/useCoinstratLogs';

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
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const queryClient = useQueryClient();

  // Centralized logs state using hooks
  const { 
    logs: tradingViewLogs, 
    loading: tvLogsLoading, 
    fetchLogs: fetchTvLogs 
  } = useTradingViewLogs({
    botId,
    userId,
    refreshTrigger: refreshTrigger > 0
  });

  const {
    logs: coinstratLogs,
    loading: csLogsLoading,
    fetchLogs: fetchCsLogs
  } = useCoinstratLogs({
    botId,
    userId,
    initialData: logsData,
    refreshTrigger: refreshTrigger > 0
  });

  // Track loading state
  const [refreshLoading, setRefreshLoading] = useState(false);

  // Update loading state based on hooks and parent loading
  useEffect(() => {
    const isLoggingLoading = tvLogsLoading || csLogsLoading;
    setRefreshLoading(isLoading || isLoggingLoading);
    
    // Safety timeout to ensure refreshLoading is eventually reset
    if (isLoggingLoading || isLoading) {
      const timer = setTimeout(() => {
        setRefreshLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, tvLogsLoading, csLogsLoading]);

  console.log(`UserBotDetailTabs - userId: ${userId}, botId: ${botId}, isLoading: ${isLoading}, refreshLoading: ${refreshLoading}`);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // When there's an onRefresh handler provided, call it when changing tabs
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleRefresh = () => {
    console.log("UserBotDetailTabs - handleRefresh called");
    setRefreshTrigger(prev => prev + 1);
    
    // Invalidate React Query cache for this bot's accounts
    queryClient.invalidateQueries({ queryKey: accountsQueryKeys.byBot(botId) });
    
    if (onRefresh) {
      onRefresh();
    }
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
        
        <TabsContent value="accounts" className="animate-in fade-in-50 duration-200">
          <BotAccountsTable 
            botId={botId} 
            userId={userId} 
            initialData={accountsData} 
            refreshTrigger={refreshTrigger > 0}
          />
        </TabsContent>
        
        <TabsContent value="tradingview-logs" className="animate-in fade-in-50 duration-200">
          <TradingViewLogs 
            botId={botId} 
            userId={userId}
            refreshTrigger={refreshTrigger > 0}
            botType={botType}
          />
        </TabsContent>
        
        <TabsContent value="coinstrat-logs" className="animate-in fade-in-50 duration-200">
          <CoinstratLogs 
            botId={botId} 
            userId={userId} 
            initialData={logsData}
            signalSourceLabel={signalSourceLabel}
            refreshTrigger={refreshTrigger > 0}
            botType={botType}
          />
        </TabsContent>
      </Tabs>
    </TabContentWrapper>
  );
};

export default UserBotDetailTabs;
